import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { PostWithJson } from "../services/axiosConfig";
import { Thuoc } from "../types";

const Medication: React.FC = () => {

    const [data, setData] = useState<any[]>([]); 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await PostWithJson<any[]>({}, 'admin/thuoc');
            setData(response.data);
          } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
          }
        };
    
        fetchData();
      }, []);

      const selectById = async (id: string) => {
        try {
            const response = await PostWithJson<Thuoc>(null, `admin/thuoc/id?ID_Thuoc=${id}`);
            setFormData(response.data);
            form.setFieldsValue({
              ID_Thuoc: response.data[0].ID_Thuoc,
              TenThuoc: response.data[0].TenThuoc,
            });
            setIsModalVisible(true);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
      }
  // Lọc dữ liệu để chỉ hiển thị thuốc có trạng thái true
  const filteredData = data.filter(item => item.TrangThai);

  const columns = [
    {
      title: 'ID Thuốc',
      dataIndex: 'ID_Thuoc',
      key: 'ID_Thuoc',
    },
    {
      title: 'Tên Thuốc',
      dataIndex: 'TenThuoc',
      key: 'TenThuoc',
    },
    {
      title: 'Chức năng',
      key: 'action',
      render: (_text: any, record: any) => (
        <span>
          <Button type="primary" style={{ marginRight: 8 }} onClick={() => selectById(record.ID_Thuoc)}>Sửa</Button>
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
          await PostWithJson({}, `admin/thuoc/xoa?ID_Thuoc=${record.ID_Thuoc}`);
          // Cập nhật lại dữ liệu sau khi xóa
          setData(prevData => prevData.filter(item => item.ID_Thuoc !== record.ID_Thuoc));
          console.log("Đã xoá thuốc:", record);
        } catch (error) {
          console.error("Lỗi khi xoá thuốc:", error);
        }
      },
    });
  };

  const handleOk = async (values: any) => {
    try {
      if (values.ID_Thuoc == null) {
        await PostWithJson({}, `admin/thuoc/themmoi?TenThuoc=${values.TenThuoc}`);
        console.log("Thêm mới thông tin thuốc:", values);
      } else {
        await PostWithJson({}, `admin/thuoc/sua?ID_Thuoc=${values.ID_Thuoc}&TenThuoc=${values.TenThuoc}`);
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
      <h2>Quản lý thuốc</h2>
      <Button type="primary" onClick={handleAddNew} style={{ marginBottom: 16 }}>
        Thêm mới
      </Button>
      <Table dataSource={filteredData} columns={columns} />
      <Modal title="Sửa thông tin thuốc" visible={isModalVisible} onOk={() => handleOk(form.getFieldsValue())} onCancel={handleCancel}>
        <Form form={form} onFinish={handleOk}>
          <Form.Item name="ID_Thuoc" label="ID Thuốc" rules={[{ required: true, message: 'Vui lòng nhập ID thuốc!' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="TenThuoc" label="Tên Thuốc" rules={[{ required: true, message: 'Vui lòng nhập tên thuốc!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Medication;
function fetchData() {
  throw new Error("Function not implemented.");
}

