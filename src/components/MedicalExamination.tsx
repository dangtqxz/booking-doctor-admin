import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Tabs, Col, Row, message, Select } from 'antd';
import { PostWithJson } from '../services/axiosConfig';
import { ThongTinBenhNhan } from '../types';

const { TabPane } = Tabs;

const MedicalExamination: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState<any[]>([]); // Khai báo state để lưu dữ liệu
  const [formData, setFormData] = useState<ThongTinBenhNhan | null>(null);
  const [form] = Form.useForm(); // Khởi tạo form
  const [activeTab, setActiveTab] = useState('1');
  const [medicationData, setMedicationData] = useState<any[]>([]); // State cho đơn thuốc
  const [resultData, setResultData] = useState<any[]>([]); // State cho kết quả xét nghiệm
  const [idHSBA, setIdHSBA] = useState<string | undefined>(undefined); // State cho kết quả xét nghiệm
  const [isTestResultModalVisible, setIsTestResultModalVisible] = useState(false);
  const [testIndicators, setTestIndicators] = useState<any[]>([]); // Danh sách chỉ số xét nghiệm
  const [testResultForm] = Form.useForm();
  const [medicines, setMedicines] = useState<any[]>([]); // Danh sách thuốc
  const [isMedicationModalVisible, setIsMedicationModalVisible] = useState(false);
  const [medicationForm] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserName = localStorage.getItem("userName");
        const response = await PostWithJson<any[]>({}, 'bacsi/lichhen?TenDangNhap=' + storedUserName);
        setData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const APITaoHSBA = async () => {
  //     setIdHSBA("10")
  //   };
  // }, []);

  useEffect(() => {
    const fetchTestIndicators = async () => {
      try {
        const response = await PostWithJson<any[]>({}, 'bacsi/chisoxetnghiem');
        setTestIndicators(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách chỉ số:', error);
      }
    };

    fetchTestIndicators();
  }, []);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await PostWithJson<any[]>({}, 'bacsi/thuoc');
        setMedicines(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách thuốc:', error);
      }
    };

    fetchMedicines();
  }, []);

  // Lọc dữ liệu để chỉ hiển thị những bệnh nhân có trạng thái "Đã xác nhận"
  const filteredData = data.filter(patient => patient.TrangThai === "Đã xác nhận");

  // Sắp xếp dữ liệu theo Ngày Khám và Giờ Khám
  const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.NgayHen);
    const dateB = new Date(b.NgayHen);
    return dateA.getTime() - dateB.getTime() || a.GioHen.localeCompare(b.GioHen);
  });

  const columns = [
    {
      title: 'ID Lịch Hẹn',
      dataIndex: 'ID_LichHen',
      key: 'ID_LichHen',
    },
    {
      title: 'Ngày Khám',
      dataIndex: 'NgayHen',
      key: 'NgayHen',
      render: (text: string) => new Date(text).toLocaleDateString(), // Định dạng ngày
    },
    {
      title: 'Giờ Khám',
      dataIndex: 'GioHen',
      key: 'GioHen',
      render: (text: string) => new Date(`1970-01-01T${text}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), // Định dạng giờ không có AM/PM
    },
    {
      title: 'Họ Tên',
      dataIndex: 'TenBenhNhan',
      key: 'TenBenhNhan',
    },
    {
      title: 'SDT',
      dataIndex: 'SoDienThoai',
      key: 'SoDienThoai',
    },
    {
      title: 'Giới Tính',
      dataIndex: 'GioiTinh',
      key: 'GioiTinh',
    },
    {
      title: 'Triệu Chứng',
      dataIndex: 'TrieuChung',
      key: 'TrieuChung',
    },
    {
      title: 'Chức Năng',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="primary" onClick={() => showModal(record.ID_LichHen)}>
          Viết Hồ Sơ Bệnh Án
        </Button>
      ),
    },
  ];

  const showModal = async (idLichHen: number) => {
    try {
      const response = await PostWithJson<ThongTinBenhNhan[]>(null, 'bacsi/thongtinbenhnhan?ID_LichHen=' + idLichHen);
      setIdHSBA(idLichHen.toString());
      setFormData(response.data[0]);
      // Cập nhật form với dữ liệu nhận được
      form.setFieldsValue({
        ID_BenhNhan: response.data[0].ID_BenhNhan,
        TenBenhNhan: response.data[0].HoTen,
        NgaySinh: new Date(response.data[0].NgaySinh).toLocaleDateString('vi-VN'),
        GioiTinh: response.data[0].GioiTinh,
        SDT: response.data[0].SDT,
        DiaChi: response.data[0].DiaChi,
        TienSuBenh: response.data[0].TienSuBenh,
        DiUng: response.data[0].DiUng,
        TrieuChung: response.data[0].TrieuChung,
    });
      
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    //setSelectedPatient(null);
  };

  // Hàm kiểm tra form panel 1
  const validatePanel1 = async () => {
    try {
      await form.validateFields([
        'ID_BenhNhan',
        'TenBenhNhan',
        'NgaySinh',
        'GioiTinh',
        'SDT',
        'DiaChi',
        'DiUng',
        'TienSuBenh',
        'NgayKham',
        'ChuanDoan',
        'HuongDieuTri',
        'TenBacSi',
        'TrieuChung'
      ]);
      return true;
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin bệnh nhân!');
      return false;
    }
  };

  // Hàm kiểm tra panel 2
  const validatePanel2 = () => {
    return true;
  };

  // Hàm xử lý next
  const handleNext = async () => {
    if (activeTab === '1') {
      const isValid = await validatePanel1();
      if (isValid) {
        setActiveTab('2');
      }
    } else if (activeTab === '2') {
      if (validatePanel2()) {
        setActiveTab('3');
      }
    }
  };

  // Hàm xử lý previous
  const handlePrev = () => {
    if (activeTab === '2') {
      setActiveTab('1');
    } else if (activeTab === '3') {
      setActiveTab('2');
    }
  };

  // Cập nhật hàm handleFormSubmit
  const handleFormSubmit = async () => {
    try {
      const formValues = await form.validateFields();
      
      const hoSoBenhAnData = {
        ID_BenhNhan: formValues.ID_BenhNhan,
        NgayKham: formValues.NgayKham,
        ChuanDoan: formValues.ChuanDoan,
        HuongDieuTri: formValues.HuongDieuTri,
        GhiChu: formValues.GhiChu || '',
        TrieuChung: formValues.TrieuChung
      };

      console.log('Data to be sent:', hoSoBenhAnData);
      
      // Gọi API để thêm hồ sơ bệnh án
      const response = await PostWithJson({}, `bacsi/themhosobenhan?ID_BenhNhan=${formValues.ID_BenhNhan}&NgayKham=${formValues.NgayKham}&ChuanDoan=${formValues.ChuanDoan}&HuongDieuTri=${formValues.HuongDieuTri}&GhiChu=${formValues.TenBacSi}&TrieuChung=${formValues.TrieuChung}`);
      if (response.data) {
        message.success('Lưu hồ sơ bệnh án thành công!');
        
        // Gọi API để lấy ID_HoSoBenhAn vừa tạo
        const idResponse = await PostWithJson<any[]>({}, 'bacsi/hosobenhanidthem');
        const newID = idResponse.data[0]?.ID_HoSoBenhAn;
        
        if (newID) {
          console.log('New ID_HoSoBenhAn:', newID);
          
          // Thêm từng kết quả xét nghiệm
          for (const result of resultData) {
            try {
              await PostWithJson({}, `bacsi/themketquaxetnghiem?ID_HoSoBenhAn=${newID}&ID_ChiSoXetNghiem=${result.ID_ChiSoXetNghiem}&GiaTri=${result.GiaTri}&GhiChu=${result.GhiChu}`);
            } catch (error) {
              console.error('Lỗi khi thêm kết quả xét nghiệm:', error);
              message.error(`Lỗi khi thêm kết quả xét nghiệm: ${result.TenChiSo}`);
            }
          }
          
          // Thêm đơn thuốc
          const currentDate = new Date();
          const day = String(currentDate.getDate()).padStart(2, '0');
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const year = currentDate.getFullYear();
          const formattedDate = `${year}-${month}-${day}`;
          const donThuocResponse = await PostWithJson({}, `bacsi/themdonthuoc?ID_HoSoBenhAn=${newID}&NgayKe=${formattedDate}`);
          
          if (donThuocResponse.data) {
            // Lấy ID_DonThuoc vừa tạo
            const donThuocIdResponse = await PostWithJson<any[]>({}, 'bacsi/donthuocidthem');
            const newDonThuocID = donThuocIdResponse.data[0]?.ID_DonThuoc;
            
            if (newDonThuocID) {
              console.log('New ID_DonThuoc:', newDonThuocID);
              
              // Thêm chi tiết đơn thuốc
              for (const medication of medicationData) {
                try {
                  await PostWithJson({}, `bacsi/themchitietdonthuoc?ID_DonThuoc=${newDonThuocID}&ID_Thuoc=${medication.ID_Thuoc}&SoLuong=${medication.SoLuong}&DonVi=${medication.DonVi}&CachDung=${medication.CachDung}`);
                } catch (error) {
                  console.error('Lỗi khi thêm chi tiết đơn thuốc:', error);
                  message.error(`Lỗi khi thêm chi tiết thuốc: ${medication.TenThuoc}`);
                }
              }
              
              message.success('Lưu chi tiết đơn thuốc thành công!');
            } else {
              message.error('Không thể lấy ID_DonThuoc mới!');
            }
          } else {
            message.error('Lỗi khi thêm đơn thuốc!');
          }

          message.success('Lưu hồ sơ bệnh án và các thông tin liên quan thành công!');
        } else {
          message.error('Không thể lấy ID_HoSoBenhAn mới!');
        }
      } else {
        message.error('Có lỗi xảy ra khi lưu hồ sơ bệnh án!');
      }
      try {
        await PostWithJson({}, `bacsi/sualichhen?ID_LichHen=${idHSBA}`);
        
        message.success('Cập nhật trạng thái lịch hẹn thành công!');
        
        // Đóng modal và có thể refresh lại danh sách lịch hẹn
        handleModalClose();
        // Nếu bạn cần refresh danh sách, có thể gọi hàm fetchData() ở đây
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái lịch hẹn:', error);
        message.error('Lỗi khi cập nhật trạng thái lịch hẹn!');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Có lỗi xảy ra khi lưu hồ sơ bệnh án!');
    }
  };

  const handleAddResult = () => {
    setIsTestResultModalVisible(true);
    testResultForm.resetFields();
  };

  const handleTestResultSubmit = async () => {
    try {
      const values = await testResultForm.validateFields();
      console.log('Form values:', values);

      if (!values.TenChiSo) {
        message.error('Vui lòng chọn chỉ số xét nghiệm!');
        return;
      }

      const selectedIndicator = testIndicators.find(
        (indicator) => indicator.ID_ChiSoXetNghiem === values.TenChiSo
      );

      if (!selectedIndicator) {
        message.error('Không tìm thấy chỉ số xét nghiệm đã chọn!');
        return;
      }

      const newResult = {
        TenChiSo: selectedIndicator.TenChiSo,
        GiaTri: values.GiaTri,
        MucBinhThuong: selectedIndicator.MucBinhThuong,
        DonViDo: selectedIndicator.DonViDo,
        GhiChu: values.GhiChu || '',
        ID_ChiSoXetNghiem: values.TenChiSo
      };

      setResultData([...resultData, newResult]);
      setIsTestResultModalVisible(false);
      testResultForm.resetFields();
    } catch (error) {
      console.error('Validation error:', error);
      message.error('Vui lòng điền đầy đủ thông tin!');
    }
  };

  const handleAddMedication = () => {
    setIsMedicationModalVisible(true);
    medicationForm.resetFields();
  };

  const handleMedicationSubmit = async () => {
    try {
      const values = await medicationForm.validateFields();
      
      if (!values.TenThuoc) {
        message.error('Vui lòng chọn thuốc!');
        return;
      }

      const selectedMedicine = medicines.find(
        (medicine) => medicine.ID_Thuoc === values.TenThuoc
      );

      if (!selectedMedicine) {
        message.error('Không tìm thấy thuốc đã chọn!');
        return;
      }

      const newMedication = {
        TenThuoc: selectedMedicine.TenThuoc,
        SoLuong: values.SoLuong,
        DonVi: values.DonVi,
        CachDung: values.CachDung,
        ID_Thuoc: values.TenThuoc
      };

      setMedicationData([...medicationData, newMedication]);
      setIsMedicationModalVisible(false);
      medicationForm.resetFields();
    } catch (error) {
      console.error('Validation error:', error);
      message.error('Vui lòng điền đầy đủ thông tin!');
    }
  };

  return (
    <>
      <Table dataSource={sortedData} columns={columns} />
      <Modal
        title="Hồ Sơ Bệnh Án"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Hồ Sơ Bệnh Án" key="1">
            <Form form={form} id="medicalForm">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="ID Bệnh nhân" name="ID_BenhNhan">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Tên Bệnh Nhân" name="TenBenhNhan" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Ngày Sinh" name="NgaySinh" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Giới Tính" name="GioiTinh" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="SĐT" name="SDT" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Địa Chỉ" name="DiaChi" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Dị Ứng" name="DiUng" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Tiền Sử Bệnh" name="TienSuBenh" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ngày Khám" name="NgayKham" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Chuẩn Đoán" name="ChuanDoan" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Hướng Điều Trị" name="HuongDieuTri" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Tên Bác Sĩ" name="TenBacSi" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Triệu Chứng" name="TrieuChung" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                  </Form.Item>
                  {/* <Form.Item label="Kết Quả Xét Nghiệm" name="KetQuaXetNghiem" valuePropName="checked">
                    <Input type="checkbox" />
                  </Form.Item> */}
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="Kết Quả Xét Nghiệm" key="2">
            <Table
                columns={[
                    { title: 'Tên Chỉ Số', dataIndex: 'TenChiSo', key: 'TenChiSo' },
                    { title: 'Giá Trị', dataIndex: 'GiaTri', key: 'GiaTri' },
                    { title: 'Mức Bình Thường', dataIndex: 'MucBinhThuong', key: 'MucBinhThuong' },
                    { title: 'Đơn Vị Đo', dataIndex: 'DonViDo', key: 'DonViDo' },
                    { title: 'Ghi Chú', dataIndex: 'GhiChu', key: 'GhiChu' },
                ]}
                dataSource={resultData}
                pagination={false}
            />
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <Button type="primary" onClick={handleAddResult}>
                    Thêm Mới Kết Quả Xét Nghiệm
                </Button>
            </div>
          </TabPane>
          <TabPane tab="Đơn Thuốc" key="3">
            <Table
                columns={[
                    { title: 'Tên Thuốc', dataIndex: 'TenThuoc', key: 'TenThuoc' },
                    { title: 'Số Lượng', dataIndex: 'SoLuong', key: 'SoLuong' },
                    { title: 'Đơn Vị', dataIndex: 'DonVi', key: 'DonVi' },
                    { title: 'Cách Dùng', dataIndex: 'CachDung', key: 'CachDung' },
                ]}
                dataSource={medicationData}
                pagination={false}
            />
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <Button type="primary" onClick={handleAddMedication}>
                    Thêm Mới Đơn Thuốc
                </Button>
            </div>
          </TabPane>
        </Tabs>
        <div style={{ textAlign: 'right', marginTop: '16px' }}>
          {activeTab !== '1' && (
            <Button style={{ marginRight: 8 }} onClick={handlePrev}>
              Quay lại
            </Button>
          )}
          {activeTab !== '3' && (
            <Button type="primary" onClick={handleNext}>
              Tiếp tục
            </Button>
          )}
          {activeTab === '3' && medicationData.length > 0 && (
            <Button type="primary" onClick={handleFormSubmit}>
              Lưu
            </Button>
          )}
        </div>
      </Modal>
      <Modal
        title="Thêm Kết Quả Xét Nghiệm"
        visible={isTestResultModalVisible}
        onOk={handleTestResultSubmit}
        onCancel={() => setIsTestResultModalVisible(false)}
      >
        <Form form={testResultForm} layout="vertical">
          <Form.Item
            name="TenChiSo"
            label="Chỉ Số Xét Nghiệm"
            rules={[{ required: true, message: 'Vui lòng chọn chỉ số xét nghiệm!' }]}
          >
            <Select 
              placeholder="Chọn chỉ số xét nghiệm"
              onChange={(value) => {
                const indicator = testIndicators.find(i => i.ID_ChiSoXetNghiem === value);
                if (indicator) {
                  testResultForm.setFieldsValue({
                    TenChiSo: value,
                    MucBinhThuong: indicator.MucBinhThuong,
                    DonViDo: indicator.DonViDo
                  });
                }
              }}
              allowClear
            >
              {testIndicators
                .filter(indicator => 
                  indicator && 
                  indicator.ID_ChiSoXetNghiem && 
                  indicator.TenChiSo
                )
                .map((indicator) => (
                  <Select.Option 
                    key={indicator.ID_ChiSoXetNghiem} 
                    value={indicator.ID_ChiSoXetNghiem}
                  >
                    {indicator.TenChiSo}
                  </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="GiaTri"
            label="Giá Trị"
            rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="GhiChu" label="Ghi Chú">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm Đơn Thuốc"
        visible={isMedicationModalVisible}
        onOk={handleMedicationSubmit}
        onCancel={() => setIsMedicationModalVisible(false)}
      >
        <Form form={medicationForm} layout="vertical">
          <Form.Item
            name="TenThuoc"
            label="Tên Thuốc"
            rules={[{ required: true, message: 'Vui lòng chọn thuốc!' }]}
          >
            <Select 
              placeholder="Chọn thuốc"
              allowClear
            >
              {medicines
                .filter(medicine => 
                  medicine && 
                  medicine.ID_Thuoc && 
                  medicine.TenThuoc
                )
                .map((medicine) => (
                  <Select.Option 
                    key={medicine.ID_Thuoc} 
                    value={medicine.ID_Thuoc}
                  >
                    {medicine.TenThuoc}
                  </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="SoLuong"
            label="Số Lượng"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
          >
            <Input type="number" min={1} />
          </Form.Item>

          <Form.Item
            name="DonVi"
            label="Đơn Vị"
            rules={[{ required: true, message: 'Vui lòng nhập đơn vị!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="CachDung"
            label="Cách Dùng"
            rules={[{ required: true, message: 'Vui lòng nhập cách dùng!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MedicalExamination; 