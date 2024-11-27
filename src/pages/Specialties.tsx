import React, { useEffect, useState } from 'react';
import SpecialtyCard from '../components/SpecialtyCard';
import HelmetWrapper from '../components/HelmetWrapper';
import { Specialty } from '../types';
import { PostWithJson } from '../services/axiosConfig';



const Specialties: React.FC = () => {

  const [dataSpecialties, setDataSpecialties] = useState<Specialty[]>([]);

  const loadDataSpecialties = async () => {
    let payload = {};
    let endpoint = 'chuyenkhoa';
    let response = await PostWithJson<Specialty[]>(payload, endpoint);
    let data = response.data;
    setDataSpecialties(data)
  }

  useEffect(() => {
    loadDataSpecialties();
  }, []);

  return (
    <HelmetWrapper title="Danh sách chuyên khoa">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">Danh sách chuyên khoa</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {dataSpecialties.map((specialty) => (
          <div key={specialty.ID_ChuyenKhoa} className="w-full">
            <SpecialtyCard tenChuyenKhoa={specialty.TenChuyenKhoa} anhUrl={specialty.AnhUrl} iD_ChuyenKhoa={specialty.ID_ChuyenKhoa} {...specialty} />
          </div>
        ))}
      </div>
    </div>
    </HelmetWrapper>
  );
};

export default Specialties;
