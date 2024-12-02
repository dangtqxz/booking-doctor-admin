import React, { useEffect, useState } from 'react';
import { HoSoBenhAn, KetQuaXetNghiem, PatientsList, Thuoc } from '../types';
import { PostWithJson } from '../services/axiosConfig';
import { Table, Button, Modal, Form, Input, Tabs, Row, Col } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

const NewPatientList: React.FC = () => {
    const [masterData, setMasterData] = useState<PatientsList[]>([]);
    const [detailData, setDetailData] = useState<{ [key: string]: PatientsList[] }>({});
    const [formData, setFormData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [resultData, setResultData] = useState<KetQuaXetNghiem[]>([]);
    const [medicationData, setMedicationData] = useState<Thuoc[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const storedUserName = localStorage.getItem("userName");
                const response = await PostWithJson<PatientsList[]>({}, `admin/dsbenhnhan`);
                setMasterData(response.data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    const getDetailData = async (id: string) => {
        try {
            if (detailData[id]) return;

            const response = await PostWithJson<HoSoBenhAn>(null, `bacsi/hosobenhan?ID_BenhNhan=${id}`);
            setDetailData(prev => ({
                ...prev, [id]: response.data
            }));
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
    };

    const selectById = async (id: string) => {
        try {
            const response = await PostWithJson<HoSoBenhAn>(null, `bacsi/hosobenhan/id?ID_HoSoBenhAn=${id}`);
            setFormData(response.data[0]);
            form.setFieldsValue({
                ID_HoSoBenhAn: response.data[0].ID_HoSoBenhAn,
                NgayKham: new Date(response.data[0].NgayKham).toLocaleDateString('vi-VN'),
                TenBacSi: response.data[0].TenBacSi,
                ChuanDoan: response.data[0].ChuanDoan,
                TrieuChung: response.data[0].TrieuChung,
                DiUng: response.data[0].DiUng,
                TienSuBenh: response.data[0].TienSuBenh,
                TenBenhNhan: response.data[0].TenBenhNhan,
                HuongDieuTri: response.data[0].HuongDieuTri,
                NgaySinh: new Date(response.data[0].NgaySinh).toLocaleDateString('vi-VN'),
                GioiTinh: response.data[0].GioiTinh,
                SoDienThoai: response.data[0].SDT,
                DiaChi: response.data[0].DiaChi,
            });
            
            if (response.data[0].KetQuaXetNghiem) {
                const resultResponse = await PostWithJson<KetQuaXetNghiem[]>(null, `bacsi/hosobenhan/ketquaxetnghiem?ID_HoSoBenhAn=${id}`);
                setResultData(resultResponse.data);
            } else {
                setResultData([]);
            }

            const medicationResponse = await PostWithJson<Thuoc[]>(null, `bacsi/hosobenhan/donthuoc?ID_HoSoBenhAn=${id}`);
            setMedicationData(medicationResponse.data);

            setIsModalVisible(true);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const MasterColumns = [
        { title: "ID Bệnh Nhân", dataIndex: "ID_BenhNhan", key: "ID_BenhNhan" },
        { title: "Tên Bệnh Nhân", dataIndex: "TenBenhNhan", key: "TenBenhNhan" },
    ];

    const detailColumns = [
        { title: 'Tên Bác Sĩ', dataIndex: 'TenBacSi', key: 'TenBacSi' },
        { title: 'Triệu Chứng', dataIndex: 'TrieuChung', key: 'TrieuChung' },
        { title: 'Chuẩn Đoán', dataIndex: 'ChuanDoan', key: 'ChuanDoan' },
        { title: 'Ngày Khám', dataIndex: 'NgayKham', key: 'NgayKham', render: (text: string) => new Date(text).toLocaleDateString(), },
        {
            title: "Chức Năng",
            key: "action",
            render: (_: any, record: any) => (
                <Button type="primary" onClick={() => selectById(record.ID_HoSoBenhAn)}>
                    Xem Hồ Sơ Bệnh Án
                </Button>
            ),
        },
    ];

    const expandedRowRender = (record: any) => {
        getDetailData(record.ID_BenhNhan);
        return <Table columns={detailColumns} dataSource={detailData[record.ID_BenhNhan]} pagination={false} />;
    };

    return (
        <>
            <Table
                columns={MasterColumns}
                expandable={{ expandedRowRender }}
                dataSource={masterData}
                rowKey="ID_BenhNhan"
            />
            <Modal
                title="Hồ Sơ Bệnh Án"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={800}
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Hồ Sơ Bệnh Án" key="1">
                        <Form form={form} id="medicalForm">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="ID Hồ Sơ Bệnh Án" name="ID_HoSoBenhAn">
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item label="Tên Bệnh Nhân" name="TenBenhNhan">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Ngày Sinh" name="NgaySinh">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Giới Tính" name="GioiTinh">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="SĐT" name="SoDienThoai">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Địa Chỉ" name="DiaChi">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Dị Ứng" name="DiUng">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Tiền Sử Bệnh" name="TienSuBenh">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Triệu Chứng" name="TrieuChung">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Ngày Khám" name="NgayKham">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Chuẩn Đoán" name="ChuanDoan">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Hướng Điều Trị" name="HuongDieuTri">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Tên Bác Sĩ" name="TenBacSi">
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
                    </TabPane>
                </Tabs>
                <div style={{ textAlign: 'right', marginTop: '16px' }}>
                    {/* <Button type="primary" htmlType="submit" form="medicalForm">
                        Lưu
                    </Button> */}
                </div>
            </Modal>
        </>
    );
};

export default NewPatientList;
