import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { PostWithJson } from "../services/axiosConfig";
import { ChuyenKhoa } from "../types";

const Specialty: React.FC = () => {

    const [data, setData] = useState<any[]>([]); 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await PostWithJson<any[]>({}, 'admin/chuyenkhoa');
            setData(response.data);
          } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
          }
        };
    
        fetchData();
      }, []);


      const selectById = async (id: string) => {
        try {
            const response = await PostWithJson<ChuyenKhoa>(null, `admin/chuyenkhoa/id?ID_ChuyenKhoa=${id}`);
            setFormData(response.data);
            form.setFieldsValue({
                ID_ChuyenKhoa: response.data[0].ID_ChuyenKhoa,
                TenChuyenKhoa: response.data[0].TenChuyenKhoa,
                MoTa: response.data[0].MoTa,
                AnhURL: response.data[0].AnhURL,
            });
            setIsModalVisible(true);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
      }

    const filteredData = data.filter(item => item.TrangThai);

    const columns = [
        {
            title: 'ID Chuyên Khoa',
            dataIndex: 'ID_ChuyenKhoa',
            key: 'ID_ChuyenKhoa',
        },
        {
            title: 'Tên Chuyên Khoa',
            dataIndex: 'TenChuyenKhoa',
            key: 'TenChuyenKhoa',
        },
        {
            title: 'Mô Tả',
            dataIndex: 'MoTa',
            key: 'MoTa',
        },
        {
            title: 'Ảnh URL',
            dataIndex: 'AnhURL',
            key: 'AnhURL',
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (_text: any, record: any) => (
                <span>
                    <Button type="primary" style={{ marginRight: 8 }} onClick={() => selectById(record.ID_ChuyenKhoa)}>Sửa</Button>
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
          title: 'Bạn có muốn xoá chuyên khoa này không?',
          onOk: async () => {
            try {
              await PostWithJson({}, `admin/chuyenkhoa/xoa?ID_ChuyenKhoa=${record.ID_ChuyenKhoa}`);
              // Cập nhật lại dữ liệu sau khi xóa
              setData(prevData => prevData.filter(item => item.ID_ChuyenKhoa !== record.ID_ChuyenKhoa));
              console.log("Đã xoá thuốc:", record);
            } catch (error) {
              console.error("Lỗi khi xoá thuốc:", error);
            }
          },
        });
      };

    const handleOk = async (values: any) => {
        try {
            if (values.ID_ChuyenKhoa == null) {
                await PostWithJson({}, `admin/chuyenkhoa/themmoi?TenChuyenKhoa=${values.TenChuyenKhoa}&MoTa=${values.MoTa}&AnhURL=${values.AnhURL}`);
                console.log("Thêm mới thông tin chuyên khoa:", values);
            } else {
                await PostWithJson({}, `admin/chuyenkhoa/sua?ID_ChuyenKhoa=${values.ID_ChuyenKhoa}&TenChuyenKhoa=${values.TenChuyenKhoa}&MoTa=${values.MoTa}&AnhURL=${values.AnhURL}`);
                console.log("Cập nhật chuyên khoa:", values);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật chuyên khoa:", error);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <h2>Quản lý chuyên khoa</h2>
            <Button type="primary" onClick={handleAddNew} style={{ marginBottom: 16 }}>
                Thêm mới
            </Button>
            <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 2 }}/>
            <Modal title="Sửa thông tin chuyên khoa" visible={isModalVisible} onOk={() => handleOk(form.getFieldsValue())} onCancel={handleCancel}>
                <Form form={form} onFinish={handleOk}>
                    <Form.Item name="ID_ChuyenKhoa" label="ID Chuyên Khoa" rules={[{ required: true, message: 'Vui lòng nhập ID chuyên khoa!' }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="TenChuyenKhoa" label="Tên Chuyên Khoa" rules={[{ required: true, message: 'Vui lòng nhập tên chuyên khoa!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="MoTa" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                        <Input.TextArea rows={9} />
                    </Form.Item>
                    <Form.Item name="AnhURL" label="Ảnh URL" rules={[{ required: true, message: 'Vui lòng nhập URL ảnh!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Specialty; 