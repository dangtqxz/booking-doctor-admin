import React, { useState, useEffect } from "react";
import {Layout, Menu } from "antd";
import HelmetWrapper from "../components/HelmetWrapper";
import AppointmentTable from "../components/AppointmentTable";
import ScheduleRegistration from "../components/ScheduleRegistration";
import MedicalExamination from "../components/MedicalExamination";
import PatientList from "../components/PatientList";
import Medication from "../components/Medication";
import Specialty from "../components/Specialty";
import Qualification from "../components/Qualification";
import AccountTable from "../components/AccountTable";
import WorkScheduleApproval from "../components/WorkScheduleApproval";
import NewPatientList from "../components/NewPatientList";

const { Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [roleID, setRoleID] = useState<string | null>(null);

  useEffect(() => {
    const storedRoleID = localStorage.getItem("roleID");
    setRoleID(storedRoleID);
  }, []);

  const handleMenuClick = (key: string) => {
    setSelectedMenu(key);
  };

  return (
    <HelmetWrapper title="Bảng điều khiển quản trị">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => handleMenuClick(key)}
          >
            {roleID === "1" && (
              <>
                <Menu.ItemGroup key="g1" title="Quản trị">
                  <Menu.Item key="1">Tài khoản</Menu.Item>
                  <Menu.Item key="2">Duyệt lịch</Menu.Item>
                  <Menu.Item key="3">Bệnh nhân</Menu.Item>
                  <Menu.Item key="4">Bằng cấp</Menu.Item>
                  <Menu.Item key="5">Chuyên khoa</Menu.Item>
                  <Menu.Item key="6">Thuốc</Menu.Item>
                </Menu.ItemGroup>
              </>
            )}
            {roleID === "2" && (
              <Menu.ItemGroup key="g2" title="Bác sĩ">
                <Menu.Item key="7">Lịch làm</Menu.Item>
                <Menu.Item key="8">Khám bệnh</Menu.Item>
                <Menu.Item key="9">Bệnh nhân</Menu.Item>
              </Menu.ItemGroup>
            )}
            {roleID === "3" && (
              <Menu.ItemGroup key="g3" title="Hỗ trợ">
                <Menu.Item key="10">Lịch hẹn</Menu.Item>
              </Menu.ItemGroup>
            )}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {selectedMenu === "10" && <AppointmentTable />}
              {selectedMenu === "7" && <ScheduleRegistration />}
              {selectedMenu === "8" && <MedicalExamination />}
              {selectedMenu === "9" && <PatientList />}
              {selectedMenu === "3" && <NewPatientList />}
              {selectedMenu === "6" && <Medication />}
              {selectedMenu === "5" && <Specialty />}
              {selectedMenu === "4" && <Qualification />}
              {selectedMenu === "1" && <AccountTable />}
              {selectedMenu === "2" && <WorkScheduleApproval />}
            </div>
          </Content>
        </Layout>
      </Layout>
    </HelmetWrapper>
  );
};

export default AdminDashboard;