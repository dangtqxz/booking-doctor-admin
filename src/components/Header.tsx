import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  PATH_DOCTORS,
  PATH_HEALTHY,
  PATH_HOME,
  PATH_SEARCH,
  PATH_SPECIALTIES,
} from "../ultis/path";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

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
          <div className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.link}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${isActive
                    ? "bg-yellow-400 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
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
