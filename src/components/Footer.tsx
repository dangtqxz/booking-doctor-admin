import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="text-center bg-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-bold mb-2">Liên hệ</h3>
            <p>Địa chỉ: 127 ngõ 1194 đường Láng, Quận Đống Đa, Hà Nội</p>
            <p>Điện thoại: 0006788590</p>
            <p>Email: bookingcare2003@gmail.com</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Liên kết nhanh</h3>
            <ul>
              <li>Về chúng tôi</li>
              <li>Dịch vụ</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Theo dõi chúng tôi</h3>
            <p>Facebook | Twitter | Instagram</p>
          </div>
        </div>
        <div className="mt-4">
          © {new Date().getFullYear()} Bản quyền thuộc về Công ty TNHH UTC - IT3
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
