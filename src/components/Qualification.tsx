import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { PostWithJson } from "../services/axiosConfig";
import { ChuyenKhoa } from "../types";

const Qualification: React.FC = () => {

    const [data, setData] = useState<any[]>([]); 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await PostWithJson<any[]>({}, 'admin/bangcap');
            setData(response.data);
          } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
          }
        };
    
        fetchData();
      }, []);

    const selectById = async (id: string) => {
        try {
            const response = await PostWithJson<ChuyenKhoa>(null, `admin/bangcap/id?ID_BangCap=${id}`);
            setFormData(response.data);
            form.setFieldsValue({
                ID_BangCap: response.data[0].ID_BangCap,
                TenBangCap: response.data[0].TenBangCap,
                MoTa: response.data[0].MoTa,
                HeSoLuong: response.data[0].HeSoLuong,
            });
            setIsModalVisible(true);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
    }

    const filteredData = data.filter(item => item.TrangThai);

    const columns = [
        {
            title: 'ID Bằng Cấp',
            dataIndex: 'ID_BangCap',
            key: 'ID_BangCap',
        },
        {
            title: 'Tên Bằng Cấp',
            dataIndex: 'TenBangCap',
            key: 'TenBangCap',
        },
        {
            title: 'Mô Tả',
            dataIndex: 'MoTa',
            key: 'MoTa',
        },
        {
            title: 'Hệ số lương',
            dataIndex: 'HeSoLuong',
            key: 'HeSoLuong',
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (_text: any, record: any) => (
                <span>
                    <Button type="primary" style={{ marginRight: 8 }} onClick={() => selectById(record.ID_BangCap)}>Sửa</Button>
                    <Button type="primary" danger onClick={() => handleDelete(record)}>Xoá</Button>
                </span>
            ),
        },
    ];

    const handleAddNew = () => {
        setFormData(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleDelete = (record: any) => {
        Modal.confirm({
          title: 'Bạn có muốn xoá thuốc này không?',
          onOk: async () => {
            try {
              await PostWithJson({}, `admin/bangcap/xoa?ID_BangCap=${record.ID_BangCap}`);
              // Cập nhật lại dữ liệu sau khi xóa
              setData(prevData => prevData.filter(item => item.ID_BangCap !== record.ID_BangCap));
              console.log("Đã xoá thuốc:", record);
            } catch (error) {
              console.error("Lỗi khi xoá thuốc:", error);
            }
          },
        });
      };

    const handleOk = async (values: any) => {
        try {
          if (values.ID_BangCap == null) {
            await PostWithJson({}, `admin/bangcap/themmoi?TenBangCap=${values.TenBangCap}&MoTa=${values.MoTa}&HeSoLuong=${values.HeSoLuong}`);
            console.log("Thêm mới thông tin thuốc:", values);
          } else {
            await PostWithJson({}, `admin/bangcap/sua?ID_BangCap=${values.ID_BangCap}&TenBangCap=${values.TenBangCap}&MoTa=${values.MoTa}&HeSoLuong=${values.HeSoLuong}`);
            console.log("Cập nhật thuốc:", values);
          }
        } catch (error) {
          console.error("Lỗi khi cập nhật thuốc:", error);
        }
        setIsModalVisible(false);
      };

      const handleCancel = () => {
        setIsModalVisible(false);
      };
    
    return (
        <div>
            <h2>Quản lý bằng cấp</h2>
            <Button type="primary" onClick={handleAddNew} style={{ marginBottom: 16 }}>
                Thêm mới
            </Button>
            <Table dataSource={filteredData} columns={columns} />
            <Modal title="Sửa thông tin bằng cấp" visible={isModalVisible} onOk={() => handleOk(form.getFieldsValue())} onCancel={handleCancel}>
                <Form form={form} onFinish={handleOk}>
                    <Form.Item name="ID_BangCap" label="ID Bằng Cấp" rules={[{ required: true, message: 'Vui lòng nhập ID bằng cấp!' }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="TenBangCap" label="Tên Bằng Cấp" rules={[{ required: true, message: 'Vui lòng nhập tên bằng cấp!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="MoTa" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập tên bằng cấp!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="HeSoLuong" label="Hệ số lương" rules={[{ required: true, message: 'Vui lòng nhập tên bằng cấp!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Qualification; 