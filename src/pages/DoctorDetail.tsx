import { AimOutlined, DollarOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPath } from "../ultis/path";
import { PATH_APPOINTMENT_BOOKING } from "../ultis/path";
import HelmetWrapper from "../components/HelmetWrapper";
import { PostWithJson } from "../services/axiosConfig";
import { Doctor } from "../types";

const { Title } = Typography;

const DoctorDetail: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [dataDoctors, setdataDoctors] = useState<Doctor>();

  const loadFeaturedDoctors = async () => {
    const payload = {};
    const endpoint = 'bacsi/{id}?idBacSi='+id;
    const response = await PostWithJson<Doctor>(payload, endpoint);
    const data = response.data;
    setdataDoctors(data)
  };
  
  useEffect(() => {
    loadFeaturedDoctors();
  }, [id]);

  return (
    <HelmetWrapper title="Thông tin bác sĩ">
      <div className="container mx-auto px-4 md:px-4 min-h-screen">
        <Title level={2} className="text-2xl md:text-3xl mb-4 mt-4">Thông tin bác sĩ</Title>
        <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
          <Avatar
            src={dataDoctors?.Avatar}
            alt={dataDoctors?.HoTen}
            className="w-32 h-32 rounded-full border-2 border-yellow-500 mb-4 md:mb-0 md:mr-4"
          />
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <Title level={2} className="text-xl md:text-2xl">{dataDoctors?.HoTen}</Title>
            <p className="text-gray-600 text-sm md:text-base">{dataDoctors?.TenChuyenKhoa}</p>
            <p className="text-gray-600 text-sm md:text-base">{dataDoctors?.TenBangCap}</p>
            <p className="text-gray-600 text-sm md:text-base"><AimOutlined /> {dataDoctors?.DiaChi}</p>
            <p className="text-gray-600 text-sm md:text-base"><DollarOutlined /> {dataDoctors?.HeSoLuong?(dataDoctors.HeSoLuong * 100000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }): ''}</p>
            <Button type="primary" className="mt-2 md:mt-0" onClick={() => navigate(createPath(PATH_APPOINTMENT_BOOKING, { id: dataDoctors?.ID_BacSi || '' }))}>Đặt lịch hẹn</Button>
          </div>
        </div>

        <Title level={3} className="mt-6 text-lg md:text-xl">Thông tin bác sĩ</Title>
        <div className="text-sm md:text-base" dangerouslySetInnerHTML={{ __html: dataDoctors?.MoTa || '' }} />
      </div>
    </HelmetWrapper>
  );
};

export default DoctorDetail;
