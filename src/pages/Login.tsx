import React, { useEffect, useState } from "react";
import { Typography, Input, Button, Form, message } from "antd";
import HelmetWrapper from "../components/HelmetWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { PostWithJson } from "../services/axiosConfig";

const { Title } = Typography;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const response = await PostWithJson<{ tenDangNhap: string; matKhau: string; roleId: string }>(
        {
          tenDangNhap: values.username,
          matKhau: values.password,
        },
        "login"
      );

      if (response.data.tenDangNhap && response.data.matKhau) {
        localStorage.setItem("userName", response.data.tenDangNhap);
        localStorage.setItem("roleID", response.data.roleId);
        message.success("Đăng nhập thành công!");
        navigate("/admindashboard");
      } else {
        message.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  useEffect(()=> {
    if(location.pathname === "/login"){
      
    }
  });

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
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
            >
              <Input
                type="text"
                placeholder="Tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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