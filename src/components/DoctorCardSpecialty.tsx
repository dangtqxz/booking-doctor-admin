import React from "react";
import { AimOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { PATH_DOCTOR_DETAIL } from "../ultis/path";

interface DoctorCardSpecialtyProps {
  hoTen: string;
  chuyenKhoa: string;
  moTa: string;
  diaChi: string;
  avatar: string;
  iD_BacSi: string;
}

const DoctorCardSpecialty: React.FC<DoctorCardSpecialtyProps> = ({
  iD_BacSi,
  hoTen,
  chuyenKhoa,
  moTa,
  diaChi,
  avatar,
}) => {
  return (
    <Link to={PATH_DOCTOR_DETAIL.replace(':id', iD_BacSi)}>
      <div className="flex items-start w-full p-4 gap-4 border rounded-lg shadow-md bg-white">
        <div className="flex flex-col items-center">
          <Avatar
            src={avatar}
            alt={hoTen}
            className="w-24 h-24 rounded-full border-2 border-yellow-500"
          />
          <span className="mt-4 cursor-pointer text-blue-500">Xem thêm</span>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-bold text-blue-600">{hoTen}</h3>
          <p className="text-gray-700 font-medium">{chuyenKhoa}</p>
          <p className="text-gray-600 text-sm">{<div dangerouslySetInnerHTML={{ __html: moTa || '' }}></div>}</p>
          <p className="text-gray-500 text-sm">
            <AimOutlined /> {diaChi}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCardSpecialty;
