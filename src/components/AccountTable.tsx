import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { PostWithJson } from "../services/axiosConfig";
import { Admin, Doctor, Support, TaiKhoan } from "../types";
import { DefaultOptionType } from "antd/es/select";

const AccountTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);
  const [bangCapOptions, setBangCapOptions] = useState([]);
  const [chuyenKhoaOptions, setChuyenKhoaOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostWithJson<any[]>({}, 'admin/taikhoan'); // Cập nhật endpoint cho tài khoản
        setData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  // Fetching data for dropdowns
  useEffect(() => {
    const fetchBangCapOptions = async () => {
      try {
        const response = await PostWithJson<any[]>({}, 'admin/bangcap'); // Update with your API endpoint
        // Chuyển đổi dữ liệu để phù hợp với Select
        const options = response.data.map((item: any) => ({
          id: item.ID_BangCap,
          value: item.ID_BangCap,
          label: item.TenBangCap,
        }));
        setBangCapOptions(options);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bằng cấp:", error);
      }
    };

    const fetchChuyenKhoaOptions = async () => {
      try {
        const response = await PostWithJson<any[]>({}, 'admin/chuyenkhoa'); // Update with your API endpoint
        // Giả sử cấu trúc tương tự cho chuyên khoa
        const options = response.data.map((item: any) => ({
          id: item.ID_ChuyenKhoa, // Cập nhật nếu cần
          value: item.ID_ChuyenKhoa, // Cập nhật nếu cần
          label: item.TenChuyenKhoa, // Cập nhật nếu cần
        }));
        setChuyenKhoaOptions(options);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu chuyên khoa:", error);
      }
    };

    fetchBangCapOptions();
    fetchChuyenKhoaOptions();
  }, []);

  const selectById = async (id: string) => {
    try {
        const response = await PostWithJson<TaiKhoan>(null, `admin/taikhoan/id?ID_TaiKhoan=${id}`);
        setFormData(response.data);
        form.setFieldsValue({
          ID_TaiKhoan: response.data[0].ID_TaiKhoan,
          TenDangNhap: response.data[0].TenDangNhap,
          Email: response.data[0].Email,
          MatKhau: response.data[0].MatKhau,
          HoTen: response.data[0].HoTen,
          SDT: response.data[0].SDT,
          NgaySinh: response.data[0].NgaySinh,
          GioiTinh: response.data[0].GioiTinh,
          DiaChi: response.data[0].DiaChi,
          Avatar: response.data[0].Avatar,
        });

        const idtk = response.data[0].ID_TaiKhoan;
        
        const admin = await PostWithJson<Admin>(null, `admin/taikhoan/admin/id?ID_TaiKhoan=${idtk}`);
        if (admin.data.length > 0) {
          //setFormData(admin.data);
          form.setFieldsValue({
            ChiTiet: admin.data[0].ChiTiet,
            Role: 'admin',
          });
        } else {
          const doctor = await PostWithJson<Doctor>(null, `admin/taikhoan/bacsi/id?ID_TaiKhoan=${idtk}`);
          if (doctor.data.length > 0) {
            //setFormData(doctor.data);
            form.setFieldsValue({
              MoTa: doctor.data[0].MoTa,
              TenChuyenKhoa: doctor.data[0].TenChuyenKhoa,
              TenBangCap: doctor.data[0].TenBangCap,
              Role: 'bacsi',
            });
          } else {
            const support = await PostWithJson<Support>(null, `admin/taikhoan/hotro/id?ID_TaiKhoan=${idtk}`);
            if (support.data.length > 0) {
              //setFormData(doctor.data);
              form.setFieldsValue({
                MoTaHT: support.data[0].MoTa,
                Role: 'hotro',
              });
            }
          }
        }
      setIsModalVisible(true);
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const filteredData = data.filter(item => item.TrangThai);

  const columns = [
    {
      title: 'ID Tài Khoản',
      dataIndex: 'ID_TaiKhoan',
      key: 'ID_TaiKhoan',
    },
    {
      title: 'Tên Đăng Nhập',
      dataIndex: 'TenDangNhap',
      key: 'TenDangNhap',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'HoTen',
      key: 'HoTen',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'SDT',
      key: 'SDT',
    },
    {
      title: 'Giới Tính',
      dataIndex: 'GioiTinh',
      key: 'GioiTinh',
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'NgaySinh',
      key: 'NgaySinh',
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'DiaChi',
      key: 'DiaChi',
    },
    {
      title: 'Chức năng',
      key: 'action',
      render: (_text: any, record: any) => (
        <span>
          <Button type="primary" onClick={() => selectById(record.ID_TaiKhoan)}>
                    Sửa
          </Button>
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
      title: 'Bạn có muốn xoá tài khoản này không?',
      onOk: async () => {
        try {
          await PostWithJson({}, `admin/taikhoan/xoa?ID_TaiKhoan=${record.ID_TaiKhoan}`);
          setData(prevData => prevData.filter(item => item.ID_TaiKhoan !== record.ID_TaiKhoan));
          console.log("Đã xoá tài khoản:", record);
        } catch (error) {
          console.error("Lỗi khi xoá tài khoản:", error);
        }
      },
    });
  };

  const handleOk = async (values: any) => {
    try {
      console.log(values);
      if (values.Role === 'admin') {

        const adminData = {
          ...values,
          ChiTiet: values.ChiTiet,
        };

        if (values.ID_TaiKhoan !== undefined) {
          await PostWithJson({}, `admin/taikhoan/admin/sua?ID_TaiKhoan=${values.ID_TaiKhoan}&TenDangNhap=${values.TenDangNhap}&MatKhau=${values.MatKhau}&Email=${values.Email}&HoTen=${values.HoTen}&ChiTiet=${values.ChiTiet}&NgaySinh=${values.NgaySinh}&GioiTinh=${values.GioiTinh}&SDT=${values.SDT}&Avatar=${values.Avatar}&DiaChi=${values.DiaChi}`);
          console.log("Cập nhật thông tin tài khoản Admin:", adminData);
        } else {
          await PostWithJson({}, `admin/taikhoan/admin/them?TenDangNhap=${values.TenDangNhap}&MatKhau=${values.MatKhau}&Email=${values.Email}&HoTen=${values.HoTen}&ChiTiet=${values.ChiTiet}&NgaySinh=${values.NgaySinh}&GioiTinh=${values.GioiTinh}&SDT=${values.SDT}&Avatar=${values.Avatar}&DiaChi=${values.DiaChi}`);
          console.log("Thêm mới tài khoản Admin:", adminData);
        }
      } else if (values.Role === 'bacsi') {

        const doctorData = {
          ...values,
          MoTa: values.MoTa,
          TenBangCap: values.TenBangCap,
          TenChuyenKhoa: values.TenChuyenKhoa,
        };

        if (values.ID_TaiKhoan !== undefined) {
          await PostWithJson({}, `admin/taikhoan/bacsi/sua?ID_TaiKhoan=${values.ID_TaiKhoan}&TenDangNhap=${values.TenDangNhap}&MatKhau=${values.MatKhau}&Email=${values.Email}&HoTen=${values.HoTen}&MoTa=${values.MoTa}&NgaySinh=${values.NgaySinh}&GioiTinh=${values.GioiTinh}&SDT=${values.SDT}&Avatar=${values.Avatar}&DiaChi=${values.DiaChi}&ID_BangCap=${values.TenBangCap}&ID_ChuyenKhoa=${values.TenChuyenKhoa}`);
          console.log("Cập nhật thông tin tài khoản Bác Sĩ:", doctorData);
        } else {
          await PostWithJson({}, `admin/taikhoan/bacsi/them?TenDangNhap=${values.TenDangNhap}&MatKhau=${values.MatKhau}&Email=${values.Email}&HoTen=${values.HoTen}&MoTa=${values.MoTa}&NgaySinh=${values.NgaySinh}&GioiTinh=${values.GioiTinh}&SDT=${values.SDT}&Avatar=${values.Avatar}&DiaChi=${values.DiaChi}&ID_BangCap=${values.TenBangCap}&ID_ChuyenKhoa=${values.TenChuyenKhoa}`);
          console.log("Thêm mới tài khoản Bác Sĩ:", doctorData);
        }
      } else if (values.Role === 'hotro') {
        const supportData = {
          ...values,
          MoTaHT: values.MoTaHT,
        };

        if (values.ID_TaiKhoan !== undefined) {
          await PostWithJson({}, `admin/taikhoan/hotro/sua?ID_TaiKhoan=${values.ID_TaiKhoan}&TenDangNhap=${values.TenDangNhap}&MatKhau=${values.MatKhau}&Email=${values.Email}&HoTen=${values.HoTen}&MoTa=${values.MoTaHT}&NgaySinh=${values.NgaySinh}&GioiTinh=${values.GioiTinh}&SDT=${values.SDT}&Avatar=${values.Avatar}&DiaChi=${values.DiaChi}`);
          console.log("Cập nhật thông tin tài khoản Hỗ Trợ:", supportData);
        } else {
          await PostWithJson({}, `admin/taikhoan/hotro/them?TenDangNhap=${values.TenDangNhap}&MatKhau=${values.MatKhau}&Email=${values.Email}&HoTen=${values.HoTen}&MoTa=${values.MoTaHT}&NgaySinh=${values.NgaySinh}&GioiTinh=${values.GioiTinh}&SDT=${values.SDT}&Avatar=${values.Avatar}&DiaChi=${values.DiaChi}`);
          console.log("Thêm mới tài khoản Hỗ Trợ:", supportData);
        }
      }

      setIsModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRoleChange = (value: string) => {
    form.setFieldsValue({ Role: value });
    setFormData(prev => ({ ...prev, Role: value }));
  };

  function handleBangCapChange(value: any, option: DefaultOptionType | DefaultOptionType[]): void {
    throw new Error("Function not implemented.");
  }

  function handleChuyenKhoaChange(value: any, option: DefaultOptionType | DefaultOptionType[]): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <h2>Quản lý tài khoản</h2>
      <Button type="primary" onClick={handleAddNew} style={{ marginBottom: 16 }}>
        Thêm mới
      </Button>
      <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 6 }}/>
      <Modal title="Sửa thông tin tài khoản" visible={isModalVisible} onOk={() => handleOk(form.getFieldsValue())} onCancel={handleCancel}>
        <Form form={form} onFinish={handleOk}>
          <Form.Item name="ID_TaiKhoan" label="ID Tài Khoản" rules={[{ required: true, message: 'Vui lòng nhập ID tài khoản!' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="TenDangNhap" label="Tên Đăng Nhập" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="MatKhau" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="HoTen" label="Họ Tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="SDT" label="Số Điện Thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="NgaySinh" label="Ngày Sinh" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="GioiTinh" label="Giới tính" rules={[{ required: true, message: 'Vui lòng nhập giới tính!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="DiaChi" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Avatar" label="Ảnh đại diện" rules={[{ required: true, message: 'Vui lòng nhập ảnh đại diện!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Role" label="Vai Trò" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
            <Select placeholder="Chọn vai trò" onChange={handleRoleChange}>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="bacsi">Bác Sĩ</Select.Option>
                <Select.Option value="hotro">Hỗ Trợ</Select.Option>
            </Select>
          </Form.Item>
          {form.getFieldValue('Role') === 'admin' && (
            <Form.Item name="ChiTiet" label="Chi Tiết" rules={[{ required: true, message: 'Vui lòng nhập chi tiết!' }]}>
              <Input />
            </Form.Item>
          )}
          {form.getFieldValue('Role') === 'bacsi' && (
            <>
              <Form.Item name="MoTa" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="TenBangCap" label="Tên Bằng Cấp" rules={[{ required: true, message: 'Vui lòng nhập tên bằng cấp!' }]}>
                <Select placeholder="Chọn bằng cấp" onChange={handleBangCapChange}>
                  {bangCapOptions.map((option: { id: string; value: string; label: string }) => (
                    <Select.Option key={option.id} value={option.value}>{option.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="TenChuyenKhoa" label="Tên Chuyên Khoa" rules={[{ required: true, message: 'Vui lòng nhập tên chuyên khoa!' }]}>
                <Select placeholder="Chọn chuyên khoa" onChange={handleChuyenKhoaChange}>
                  {chuyenKhoaOptions.map((option: { id: string; value: string; label: string }) => (
                    <Select.Option key={option.id} value={option.value}>{option.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
          {form.getFieldValue('Role') === 'hotro' && (
            <Form.Item name="MoTaHT" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AccountTable; 