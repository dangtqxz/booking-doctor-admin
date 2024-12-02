import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import {
  PATH_DOCTORS,
  PATH_HEALTHY,
  PATH_HOME,
  PATH_SEARCH,
  PATH_SPECIALTIES,
} from "../ultis/path";
import { PostWithJson } from "../services/axiosConfig";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [userAvatar, setUserAvatar] = useState("path/to/default/avatar.jpg");
  const [userName, setUserName] = useState("User Name");

  const menuItems = [
    { key: "home", label: "Trang chủ", link: PATH_HOME },
    {
      key: "specialties",
      label: "Chuyên khoa",
      link: PATH_SPECIALTIES,
    },
    {
      key: "doctors",
      label: "Bác sĩ",
      link: PATH_DOCTORS,
    },
    {
      key: "health",
      label: "Sống khỏe",
      link: PATH_HEALTHY,
    },
    {
      key: "search",
      label: "Tra cứu",
      link: PATH_SEARCH,
    },
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        try {
          const response = await PostWithJson<{ avatar: string; hoTen: string}> (
            {},
            'account?TenDangNhap='+storedUserName
          );
          setUserAvatar(response.data.avatar);
          setUserName(response.data.hoTen);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    console.log("User logged out");
    window.location.reload();
  }

  return (
    <AntHeader
      className={`bg-[#EDFFFA] p-0 transition-all duration-300 ${isFixed ? "fixed top-0 left-0 right-0 z-50 shadow-md" : ""
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to={PATH_HOME}
            className="text-white text-xl font-bold flex items-center gap-2"
          >
            <img
              className="w-10 h-10"
              src="https://bookingcare.vn/assets/icon/bookingcare-maskable-icon.png"
              alt="Logo"
            />
            <span className="text-yellow-500">BookingCare</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-medium text-gray-600">
              {userName}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium transition-colors duration-200 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <div className="md:hidden">
            <Button
              type="primary"
              onClick={showDrawer}
              icon={<MenuOutlined />}
            />
          </div>
        </div>
      </div>
      <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
        <Menu mode="vertical" defaultSelectedKeys={["home"]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.link} onClick={onClose}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </AntHeader>
  );
};

export default Header;
