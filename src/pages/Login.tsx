import React, { useState } from "react";
import { Typography, Input, Button, Form } from "antd";
import HelmetWrapper from "../components/HelmetWrapper";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (values: { email: string; password: string }) => {
    console.log("Email:", values.email);
    console.log("Password:", values.password);
    // Thêm logic xử lý đăng nhập ở đây
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  return (
    <HelmetWrapper title="Đăng nhập">
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <Title level={3} className="text-center mb-6">Đăng nhập</Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Đăng nhập
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="link" onClick={handleForgotPassword} className="w-full text-center">
                Quên mật khẩu?
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default Login;