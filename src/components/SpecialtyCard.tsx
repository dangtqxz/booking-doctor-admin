import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { PATH_SPECIALTY_DETAIL } from '../ultis/path';

interface SpecialtyCardProps {
  tenChuyenKhoa: string;
  anhUrl: string;
  iD_ChuyenKhoa: string;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ tenChuyenKhoa, anhUrl, iD_ChuyenKhoa }) => {
  return (
    <Link to={PATH_SPECIALTY_DETAIL.replace(':id', iD_ChuyenKhoa)}>
      <Card
        hoverable
        cover={<img alt={tenChuyenKhoa} src={anhUrl} className="h-40 object-cover" />}
        className="w-full"
      >
        <Card.Meta title={tenChuyenKhoa}/>
      </Card>
    </Link>
  );
};

export default SpecialtyCard;
