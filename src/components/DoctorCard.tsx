import { Avatar } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { PATH_DOCTOR_DETAIL } from "../ultis/path"; // Thêm đường dẫn từ path.ts

interface DoctorCardHomePageProps {
  iD_BacSi: string;
  hoTen: string;
  tenBangCap: string;
  avatar: string;
}

const DoctorCard: React.FC<DoctorCardHomePageProps> = ({
  iD_BacSi,
  hoTen,
  tenBangCap,
  avatar,
}) => {
  return (
    <Link to={PATH_DOCTOR_DETAIL.replace(':id', iD_BacSi)}> {/* Sử dụng đường dẫn từ path.ts */}
      <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
        <Avatar
          src={avatar}
          alt={hoTen}
          className="w-32 h-32 rounded-full object-cover mb-2"
        />
        <h2 className="text-lg font-semibold">{hoTen}</h2>
        <p className="text-gray-600">{tenBangCap}</p>
      </div>
    </Link>
  );
};

export default DoctorCard;
