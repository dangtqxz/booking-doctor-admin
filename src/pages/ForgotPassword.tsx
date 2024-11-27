import React, { useState } from "react";
import { Typography, Input, Button, Form, message } from "antd";
import HelmetWrapper from "../components/HelmetWrapper";

const { Title } = Typography;

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (values: { email: string }) => {
    console.log("Email for password reset:", values.email);
    // Thêm logic gửi yêu cầu khôi phục mật khẩu ở đây
    message.success("Yêu cầu khôi phục mật khẩu đã được gửi!");
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
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
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