import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import DoctorCardSpecialty from "../components/DoctorCardSpecialty";
import HelmetWrapper from "../components/HelmetWrapper";
import { useParams } from "react-router-dom";
import { Doctor, Specialty } from "../types";
import { PostWithJson } from "../services/axiosConfig";
const { Title, Paragraph } = Typography;
const SpecialtyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [dataSpecialtyDetail, setdataSpecialtyDetail] = useState<Specialty>();

  const loadDataSpecialties = async () => {
    const payload = {};
    const endpoint = 'chuyenkhoa/id?idChuyenKhoa='+id;
    const response = await PostWithJson<Specialty>(payload, endpoint);
    const data = response.data;
    setdataSpecialtyDetail(data)
  }

  useEffect(() => {
    loadDataSpecialties();
  }, [id]);

  const [dataDoctor, setdataDoctor] = useState<Doctor[]>([]);

  const loadDataDoctor = async () => {
    let payload = {};
    let endpoint = 'bacsi/chuyenkhoa/{id}?idChuyenKhoa='+id;
    let response = await PostWithJson<Doctor[]>(payload, endpoint);
    console.log(response ,'data')
    let data = response.data;
    setdataDoctor(data)
  };

  useEffect(() => {
    loadDataDoctor();
  }, []);

  return (
    <HelmetWrapper title="Thông tin chuyên khoa">
    <div className="container mx-auto px-4 md:px-4 py-8">
      <Title level={2}>{dataSpecialtyDetail?.TenChuyenKhoa}</Title>
      <Paragraph>Bác sĩ chuyên khoa {dataSpecialtyDetail?.TenChuyenKhoa}</Paragraph>
      <Paragraph>
        Danh sách bác sĩ {dataSpecialtyDetail?.TenChuyenKhoa} uy tín tại Việt Nam.
      </Paragraph>
      <div dangerouslySetInnerHTML={{ __html: dataSpecialtyDetail?.MoTa || '' }} />


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 mt-4">
        {dataDoctor.map((doctor, index) => (
          <DoctorCardSpecialty hoTen={doctor.HoTen} moTa={doctor.MoTa} diaChi={doctor.DiaChi} iD_BacSi={doctor.ID_BacSi} chuyenKhoa={doctor.TenChuyenKhoa} avatar={doctor.Avatar} key={index} {...doctor} />
        ))}
      </div>



    </div>
    </HelmetWrapper>
  );
};

export default SpecialtyDetail;
