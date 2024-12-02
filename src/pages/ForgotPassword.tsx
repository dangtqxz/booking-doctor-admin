import React, { useState } from "react";
import { Typography, Input, Button, Form, message } from "antd";
import HelmetWrapper from "../components/HelmetWrapper";
import { PostWithJson } from "../services/axiosConfig";

const { Title } = Typography;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (values: { email: string }) => {
    try {
      setLoading(true);
      const response = await PostWithJson({}, `forgotpassword?email=${values.email}`);
      
      if (response.status === 200) {
        message.success("Thông tin tài khoản đã được gửi vào email của bạn!");
      } else {
        message.error("Email không tồn tại trong hệ thống!");
      }
    } catch (error) {
      message.error("Email không tồn tại trong hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HelmetWrapper title="Quên mật khẩu">
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <Title level={3} className="text-center mb-6">Quên mật khẩu</Title>
          <Form
            name="forgotPassword"
            onFinish={handleForgotPassword}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" }
              ]}
            >
              <Input
                type="email"
                placeholder="Nhập email của bạn"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full"
                loading={loading}
              >
                Gửi yêu cầu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default ForgotPassword;