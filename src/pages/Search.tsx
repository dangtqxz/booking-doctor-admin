import React, { useState } from 'react';
import { Input, Button, Table } from 'antd';
import HelmetWrapper from '../components/HelmetWrapper';

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<any[]>([]); // Dữ liệu cho bảng
  const [loading, setLoading] = useState(false);

  const dataFake = [
    {
      id: 1,
      name: 'Dữ liệu test',
      description: 'test'
    }]

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="primary" onClick={() => handleDownloadPDF(record.id)}>
          Tải PDF
        </Button>
      ),
    },
  ];

  // Hàm tìm kiếm và lấy dữ liệu
  const handleSearch = async () => {
    setLoading(true);
    try {
      // Giả sử API này trả về một danh sách dữ liệu
      const response = await fetch(`https://example.com/api/data?search=${inputValue}`);
      const result = await response.json();
      setData(result); // Lưu dữ liệu vào state
    } catch (error) {
      setData(dataFake)
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (id: string) => {
    try {
      const response = await fetch(`https://pdfobject.com/pdf/sample.pdf`, {
        method: 'GET',
      });

      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        // Nếu API trả về base64 (giả sử định dạng là JSON chứa base64)
        const json = await response.json();

        if (json.base64Data) {
          const base64Data = json.base64Data;
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          // Tạo URL cho file và tải về
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `file-${id}.pdf`;
          link.click();
        }
      } else {
        // Nếu API trả về file trực tiếp
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `file-${id}.pdf`;
        link.click();
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };


  return (
    <HelmetWrapper title="Danh sách chuyên khoa">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center">Tra cứu thông tin</h1>

        {/* Căn giữa Input và Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
          <Input
            placeholder="Nhập thông tin cần tra cứu"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full sm:w-80" // Đảm bảo input có kích thước phù hợp trên các màn hình
          />
          <Button type="primary" onClick={handleSearch} className="w-full sm:w-auto">
            Tra cứu
          </Button>
        </div>

        {/* Bảng hiển thị dữ liệu */}
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </HelmetWrapper>
  );
};

export default Search;

