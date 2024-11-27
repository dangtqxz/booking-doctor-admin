import {
  Avatar,
  Button,
  DatePicker,
  Descriptions,
  Form,
  Input,
  TimePicker,
  Typography,
  Modal,
  message,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import HelmetWrapper from "../components/HelmetWrapper";
import { Doctor } from "../types";
import { PostWithJson } from "../services/axiosConfig";
import { JointContent } from "antd/es/message/interface";

const { Title } = Typography;

interface BookingFormValues {
  name: string;
  phone: string;
  email: string;
  birthday: moment.Moment;
  sex: string;
  symptom: string;
  medicalhistory: string;
  address: string;
  date: moment.Moment;
  time: moment.Moment;
}

const Booking: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<BookingFormValues | null>(
    null
  );

  //const selectedDoctor = dataDoctor.find((d) => d.id === id);
  const [dataDoctors, setdataDoctors] = useState<Doctor>();

  const loadFeaturedDoctors = async () => {
    const payload = {};
    const endpoint = 'bacsi/{id}?idBacSi='+id;
    const response = await PostWithJson<Doctor>(payload, endpoint);
    const data = response.data;
    setdataDoctors(data)
  };
  
  useEffect(() => {
    loadFeaturedDoctors();
  }, [id]);
  
  const onFinish = async (values: BookingFormValues) => {
    console.log("Received values:", values);
    
    // Dữ liệu để gửi đến API đăng ký bệnh nhân
    const registerData = {
        TenDangNhap: '', // Sử dụng email làm tên đăng nhập
        MatKhau: '', // Bạn có thể thay đổi cách xử lý mật khẩu
        Email: values.email,
        HoTen: values.name,
        NgaySinh: values.birthday.format("YYYY-MM-DD"), // Định dạng ngày sinh
        GioiTinh: values.sex,
        SDT: values.phone,
        DiaChi: values.address,
        Avatar: '', // Nếu có avatar, bạn có thể thêm vào đây
        TienSuBenh: values.medicalhistory,
        DiUng: '' // Hoặc bất kỳ thông tin nào khác bạn muốn gửi
    };

    try {
        // Gọi API để đăng ký bệnh nhân
        const registerResponse = await PostWithJson<JointContent>(registerData, 'register/partient');
        if (registerResponse.data && typeof registerResponse.data === 'object') {
            message.success((registerResponse.data as any).message);
        }

        // Dữ liệu để gửi đến API thêm lịch hẹn
        const lichHenData = {
            ID_BacSi: id, // ID bác sĩ từ dữ liệu bác sĩ
            ID_BenhNhan: (registerResponse.data as any).iD_TaiKhoan, // ID tài khoản vừa đăng ký
            NgayHen: values.date.format("YYYY-MM-DD"), // Ngày hẹn
            GioHen: values.time.format("HH:mm"), // Giờ hẹn
            TrangThai: 'Chưa xác nhận', // Trạng thái mặc định
            GhiChu: '', // Ghi chú nếu có
            TrieuChung: values.symptom // Triệu chứng
        };

        // Gọi API để thêm lịch hẹn
        const lichHenResponse = await PostWithJson(lichHenData, 'lichhen');
        message.success((lichHenResponse.data as any).message);

        setBookingInfo(values);
        setIsModalVisible(true);
    } catch (error: any) {
        // Xử lý lỗi
        message.error(error.errorStatus === 400 ? "Gmail này đã đăng ký khám trước đó." : "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    message.success("Đặt lịch thành công");
    form.resetFields();
  };

  return (
    <HelmetWrapper title="Đặt lịch khám">
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <Title level={2} className="text-2xl md:text-3xl mb-4 md:mb-6">
          Đặt lịch khám
        </Title>
        {dataDoctors && (
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="mb-4 md:mb-0 md:mr-6">
                <Avatar size={128} src={dataDoctors.Avatar} />
              </div>
              <Descriptions
                
                title="Thông tin bác sĩ"
                bordered
                column={{ xs: 1, sm: 2, md: 3 }}
                className="w-full"
              >
                <Descriptions.Item label="Tên" span={3}>
                  {dataDoctors.HoTen}
                </Descriptions.Item>
                <Descriptions.Item label="Chuyên khoa" span={3}>
                  {dataDoctors.TenChuyenKhoa}
                </Descriptions.Item>
                <Descriptions.Item label="Địa điểm" span={3}>
                  {dataDoctors.DiaChi}
                </Descriptions.Item>
                <Descriptions.Item label="Mô tả" span={3}>
                  <div dangerouslySetInnerHTML={{ __html: dataDoctors?.MoTa || '' }}></div>
                </Descriptions.Item>
                <Descriptions.Item label="Giá khám" span={3}>
                  {dataDoctors.HeSoLuong?(dataDoctors.HeSoLuong * 100000).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }): ''}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        )}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="birthday" label="Ngày sinh" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="sex"
            label="Giới tính"
            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
          >
            <Select>
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
              <Select.Option value="Khác">Khác</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="symptom"
            label="Triệu chứng"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="medicalhistory"
            label="Tiền sử bệnh"
          >
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Ngày khám" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="time" label="Giờ khám" rules={[{ required: true }]}>
            <TimePicker className="w-full" format="HH:mm" />
          </Form.Item>
          <Form.Item className="md:col-span-2">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full md:w-auto"
            >
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="Đặt lịch thành công"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalOk}
        >
          {bookingInfo && (
            <div>
              <p>Họ và tên: {bookingInfo.name}</p>
              <p>Số điện thoại: {bookingInfo.phone}</p>
              <p>Email: {bookingInfo.email}</p>
              <p>Ngày sinh: {bookingInfo.birthday.format("DD/MM/YYYY")}</p>
              <p>Giới tính: {bookingInfo.sex}</p>
              <p>Địa chỉ: {bookingInfo.address}</p>
              <p>Triệu chứng: {bookingInfo.symptom}</p>
              <p>Tiền sử bệnh: {bookingInfo.medicalhistory}</p>
              <p>Ngày khám: {bookingInfo.date.format("DD/MM/YYYY")}</p>
              <p>Giờ khám: {bookingInfo.time.format("HH:mm")}</p>
            </div>
          )}
        </Modal>
      </div>
    </HelmetWrapper>
  );
};

export default Booking;
