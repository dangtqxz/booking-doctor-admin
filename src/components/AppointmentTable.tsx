import React from "react";
import { Table } from "antd";

const AppointmentTable: React.FC = () => {
  const columns = [
    { title: "ID Lịch Hẹn", dataIndex: "idLichHen", key: "idLichHen" },
    { title: "Ngày Hẹn", dataIndex: "ngayHen", key: "ngayHen" },
    { title: "Giờ Hẹn", dataIndex: "gioHen", key: "gioHen" },
    { title: "Tên Bệnh Nhân", dataIndex: "tenBenhNhan", key: "tenBenhNhan" },
    { title: "Tên Bác Sĩ", dataIndex: "tenBacSi", key: "tenBacSi" },
    { title: "Trạng Thái", dataIndex: "trangThai", key: "trangThai" },
    {
      title: "Chức Năng",
      key: "action",
      render: () => <a>Chi Tiết</a>,
    },
  ];

  const data = [
    {
      key: "1",
      idLichHen: "001",
      ngayHen: "2023-10-01",
      gioHen: "10:00",
      tenBenhNhan: "Nguyen Van A",
      tenBacSi: "Dr. Tran",
      trangThai: "Đã xác nhận",
    },
    // Thêm dữ liệu mẫu khác nếu cần
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default AppointmentTable;