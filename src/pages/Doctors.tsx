import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import HelmetWrapper from '../components/HelmetWrapper';
import { Doctor } from '../types';
import { PostWithJson } from '../services/axiosConfig';

const Doctors: React.FC = () => { 

  const [dataDoctors, setdataDoctors] = useState<Doctor[]>([]);

  const loadFeaturedDoctors = async () => {
    let payload = {};
    let endpoint = 'bacsi';
    let response = await PostWithJson<Doctor[]>(payload, endpoint);
    let data = response.data;
    setdataDoctors(data)
  };

  useEffect(() => {
    loadFeaturedDoctors();
  }, []);

  return (
    <HelmetWrapper title="Danh sách bác sĩ">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">Danh sách bác sĩ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {dataDoctors.map((doctor) => (
          <div key={doctor.ID_BacSi} className="w-full">
            <DoctorCard iD_BacSi={doctor.ID_BacSi} hoTen={doctor.HoTen} tenBangCap={doctor.TenBangCap} avatar={doctor.Avatar} {...doctor} />
          </div>
        ))}
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default Doctors;
