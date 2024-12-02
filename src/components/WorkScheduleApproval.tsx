import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { PostWithJson } from "../services/axiosConfig";
import moment from "moment"; // Import moment để định dạng ngày giờ

const WorkScheduleApproval: React.FC = () => {
  //const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostWithJson<any[]>({}, 'admin/lichlamviec'); // Cập nhật endpoint cho lịch làm việc
        const filtered = response.data.filter(item => item.TrangThai === "Chưa duyệt"); // Lọc chỉ hiển thị bản ghi có trạng thái "Chưa duyệt"
        //setData(filtered);
        setFilteredData(filtered); // Khởi tạo dữ liệu đã lọc
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
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
      render: (text: string) => moment(text).format("DD/MM/YYYY"), // Định dạng ngày
      sorter: (a: any, b: any) => moment(a.NgayLamViec).unix() - moment(b.NgayLamViec).unix(), // Sắp xếp theo ngày
    },
    {
      title: 'Thời Gian Bắt Đầu',
      dataIndex: 'ThoiGianBatDau',
      key: 'ThoiGianBatDau',
      render: (text: string) => moment(text, "HH:mm:ss").format("HH:mm"), // Định dạng giờ:phút
      sorter: (a: any, b: any) => moment(a.ThoiGianBatDau, "HH:mm:ss").unix() - moment(b.ThoiGianBatDau, "HH:mm:ss").unix(), // Sắp xếp theo thời gian bắt đầu
    },
    {
      title: 'Thời Gian Kết Thúc',
      dataIndex: 'ThoiGianKetThuc',
      key: 'ThoiGianKetThuc',
      render: (text: string) => moment(text, "HH:mm:ss").format("HH:mm"), // Định dạng giờ:phút
    },
    {
      title: 'Tên Bác Sĩ',
      dataIndex: 'TenBacSi',
      key: 'TenBacSi',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'TrangThai',
      key: 'TrangThai',
    },
    {
      title: 'Chức năng',
      key: 'action',
      render: (_text: any, record: any) => (
        <span>
          <Button type="primary" style={{ marginRight: 8 }} onClick={() => handleApprove(record)}>Duyệt</Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>Xoá</Button>
        </span>
      ),
    },
  ];

  const handleApprove = async (record: any) => {
    Modal.confirm({
      title: 'Bạn có muốn chấp nhận lịch làm việc này không?',
      onOk: async () => {
        try {
          await PostWithJson({}, `admin/lichlamviec/suaduyet?ID_LichLamViec=${record.ID_LichLamViec}`);
          setFilteredData(prevData => prevData.filter(item => item.ID_LichLamViec !== record.ID_LichLamViec));
          console.log("Đã chấp nhận lịch làm việc:", record);
        } catch (error) {
          console.error("Lỗi khi chấp nhận lịch làm việc:", error);
        }
      },
    });
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: 'Bạn có muốn từ chối lịch làm việc này không?',
      onOk: async () => {
        try {
          await PostWithJson({}, `admin/lichlamviec/suahuy?ID_LichLamViec=${record.ID_LichLamViec}`);
          setFilteredData(prevData => prevData.filter(item => item.ID_LichLamViec !== record.ID_LichLamViec));
          console.log("Đã từ chối lịch làm việc:", record);
        } catch (error) {
          console.error("Lỗi khi từ chối lịch làm việc:", error);
        }
      },
    });
  };

  return (
    <div>
      <h2>Duyệt Lịch Làm Việc</h2>
      <Table dataSource={filteredData} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default WorkScheduleApproval; 