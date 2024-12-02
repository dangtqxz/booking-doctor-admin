import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Table } from 'antd';
import { PostWithJson } from '../services/axiosConfig';
import { LichLam } from '../types';

const ScheduleRegistration: React.FC = () => {
  const [form] = Form.useForm();
  const [pendingAppointments, setPendingAppointments] = useState<LichLam[]>([]);
  const [workSchedule, setWorkSchedule] = useState<LichLam[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('userName');
        const response = await PostWithJson<LichLam[]>({}, 'bacsi/lichlam?TenDangNhap='+username);
        const data = response.data;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const filteredData = data.filter(item => {
          const workDate = new Date(item.NgayLamViec);
          workDate.setHours(0, 0, 0, 0);
          return workDate >= today;
        });
  
        const pending = filteredData.filter(item => item.TrangThai === 'Chưa duyệt');
        const approved = filteredData.filter(item => item.TrangThai === 'Đã duyệt');
  
        setPendingAppointments(pending);
        setWorkSchedule(approved);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'ID Lịch Làm Việc',
      dataIndex: 'ID_LichLamViec',
      key: 'ID_LichLamViec',
    },
    {
      title: 'Ngày Làm Việc',
      dataIndex: 'NgayLamViec',
      key: 'NgayLamViec',
      render: (text: string) => new Date(text).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    },
    {
      title: 'Thời Gian Bắt Đầu',
      dataIndex: 'ThoiGianBatDau',
      key: 'ThoiGianBatDau',
      render: (text: string) => new Date(`1970-01-01T${text}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    },
    {
      title: 'Thời Gian Kết Thúc',
      dataIndex: 'ThoiGianKetThuc',
      key: 'ThoiGianKetThuc',
      render: (text: string) => new Date(`1970-01-01T${text}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    },
  ];

  const appointmentColumns = [
    {
      title: 'Ngày',
      dataIndex: 'NgayLamViec',
      key: 'NgayLamViec',
      render: (text: string) => new Date(text).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    },
    {
      title: 'Thời Gian Bắt Đầu',
      dataIndex: 'ThoiGianBatDau',
      key: 'ThoiGianBatDau',
      render: (text: string) => new Date(`1970-01-01T${text}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    },
    {
      title: 'Thời Gian Kết Thúc',
      dataIndex: 'ThoiGianKetThuc',
      key: 'ThoiGianKetThuc',
      render: (text: string) => new Date(`1970-01-01T${text}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    },
  ];

  const onFinish = async (values: any) => {
    console.log('Received values:', values);
    
    // Call the API to register the schedule
    try {
      const tdn = localStorage.getItem('userName');
      const response = await PostWithJson({},
        `bacsi/themlichlam?TenDangNhap=${tdn}&NgayLamViec=${values.date.format('YYYY-MM-DD')}&ThoiGianBatDau=${values.startTime}&ThoiGianKetThuc=${values.endTime}`
      );
      console.log('API response:', response);
    } catch (error) {
      console.error("Error calling API:", error);
    }

    form.resetFields();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <Form form={form} layout="vertical" onFinish={onFinish} style={{ flex: 1 }}>
          <Form.Item name="date" label="Ngày" rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="startTime" label="Thời gian bắt đầu" rules={[{ required: true, message: 'Vui lòng nhập thời gian bắt đầu!' }]}>
            <Input placeholder="Nhập thời gian bắt đầu" />
          </Form.Item>
          <Form.Item name="endTime" label="Thời gian kết thúc" rules={[{ required: true, message: 'Vui lòng nhập thời gian kết thúc!' }]}>
            <Input placeholder="Nhập thời gian kết thúc" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <Table
          dataSource={pendingAppointments}
          columns={appointmentColumns}
          pagination={false}
          style={{ flex: 1, marginLeft: '20px' }}
        />
      </div>

      <Table
        dataSource={workSchedule}
        columns={columns}
        pagination={false}
        style={{ marginTop: '20px', width: '100%' }}
      />
    </div>
  );
};

export default ScheduleRegistration; 