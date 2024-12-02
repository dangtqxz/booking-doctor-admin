import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Select } from "antd";
import { Appointment } from "../types";
import { PostWithJson } from "../services/axiosConfig";

const AppointmentTable: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostWithJson<Appointment[]>({}, "hotro/lichhen");
        setData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const formatTime = (timeString: string) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleOk = async () => {
    if (selectedAppointment) {
      const updatedAppointment = { ...selectedAppointment };

      if (updatedAppointment.TrangThai === "Chưa xác nhận") {
        updatedAppointment.TrangThai = "Đang chờ";
      } else if (updatedAppointment.TrangThai === "Đang chờ") {
        updatedAppointment.TrangThai = "Đã xác nhận";
      }

      await PostWithJson<{ idLichHen: number; trangThai: string }>(
        { trangThai: updatedAppointment.TrangThai },
        "hotro/lichhen/trangthai?idLichHen="+updatedAppointment.ID_LichHen
      );
      setData(data.map(appointment => appointment.ID_LichHen === updatedAppointment.ID_LichHen ? updatedAppointment : appointment));
    }
    setIsModalVisible(false);
  };

  const handleCancel = async () => {
    if (selectedAppointment) {
      const updatedAppointment = { ...selectedAppointment, TrangThai: "Đã huỷ" };

      await PostWithJson<{ idLichHen: number; trangThai: string }>(
        { trangThai: updatedAppointment.TrangThai },
        "hotro/lichhen/trangthai?idLichHen="+updatedAppointment.ID_LichHen
      );
      setData(data.map(appointment => appointment.ID_LichHen === updatedAppointment.ID_LichHen ? updatedAppointment : appointment));
    }
    setIsModalVisible(false);
  };

  const columns = [
    { title: "ID Lịch Hẹn", dataIndex: "ID_LichHen", key: "ID_LichHen" },
    { title: "Ngày Hẹn", dataIndex: "NgayHen", key: "NgayHen", render: formatDate },
    { title: "Giờ Hẹn", dataIndex: "GioHen", key: "GioHen", render: formatTime },
    { title: "Tên Bệnh Nhân", dataIndex: "TenBenhNhan", key: "TenBenhNhan" },
    { title: "Tên Bác Sĩ", dataIndex: "TenBacSi", key: "TenBacSi" },
    {
      title: "Trạng Thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      filters: [
        { text: 'Chưa xác nhận', value: 'Chưa xác nhận' },
        { text: 'Đang chờ', value: 'Đang chờ' },
        { text: 'Đã xác nhận', value: 'Đã xác nhận' },
        { text: 'Đã huỷ', value: 'Đã huỷ' },
      ],
      onFilter: (value: string | number | boolean, record: Appointment) => record.TrangThai === value,
      render: (text: string) => {
        let color = "";
        switch (text) {
          case "Chưa xác nhận":
            color = "yellow";
            break;
          case "Đang chờ":
            color = "deepskyblue";
            break;
          case "Đã xác nhận":
            color = "green";
            break;
          case "Đã huỷ":
            color = "red";
            break;
          default:
            color = "transparent";
        }
        return (
          <span
            style={{
              backgroundColor: color,
              padding: "5px 10px",
              borderRadius: "4px",
              color: "white",
              display: "inline-block",
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Chức Năng",
      key: "action",
      render: (_: any, record: Appointment) => (
        <a
          onClick={() => showModal(record)}
          style={{
            backgroundColor: "yellow",
            padding: "5px 10px",
            borderRadius: "4px",
            color: "black",
            textDecoration: "none",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          Chi Tiết
        </a>
      ),
    },
  ];

  const showModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  return (
    <>
      <Select
        placeholder="Chọn trạng thái"
        onChange={setFilterStatus}
        style={{ marginBottom: 16, width: 200 }}
      >
        <Select.Option value={undefined}>Tất cả</Select.Option>
        <Select.Option value="Chưa xác nhận">Chưa xác nhận</Select.Option>
        <Select.Option value="Đang chờ">Đang chờ</Select.Option>
        <Select.Option value="Đã xác nhận">Đã xác nhận</Select.Option>
        <Select.Option value="Đã huỷ">Đã huỷ</Select.Option>
      </Select>
      <Table 
        columns={columns as any} 
        dataSource={data.filter(appointment => !filterStatus || appointment.TrangThai === filterStatus)}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Chi Tiết Lịch Hẹn"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={handleCancel} disabled={!selectedAppointment || (selectedAppointment.TrangThai !== "Chưa xác nhận" && selectedAppointment.TrangThai !== "Đang chờ")}>
            Hủy Lịch
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} disabled={!selectedAppointment || (selectedAppointment.TrangThai !== "Chưa xác nhận" && selectedAppointment.TrangThai !== "Đang chờ")}>
            Chấp Nhận
          </Button>,
        ]}
      >
        {selectedAppointment && (
          <div>
            <p>ID Lịch Hẹn: {selectedAppointment.ID_LichHen}</p>
            <p>Ngày Hẹn: {formatDate(selectedAppointment.NgayHen)}</p>
            <p>Giờ Hẹn: {formatTime(selectedAppointment.GioHen)}</p>
            <p>Triệu Chứng: {selectedAppointment.TrieuChung}</p>
            <p>Ghi Chú: {selectedAppointment.GhiChu}</p>
            <p>Trạng Thái: {selectedAppointment.TrangThai}</p>
            <p>Tên Bệnh Nhân: {selectedAppointment.TenBenhNhan}</p>
            <p>SĐT Bệnh Nhân: {selectedAppointment.SoDienThoai}</p>
            <p>Tên Bác Sĩ: {selectedAppointment.TenBacSi}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AppointmentTable;