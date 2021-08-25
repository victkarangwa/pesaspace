import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Tooltip,
  message,
  Radio,
} from "antd";
import {
  MoneyCollectFilled,
  VerifiedOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import DashboardLayout from "layouts/DashboardLayout/AdminLayout";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Button from "components/Button";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    core: { loading },
  } = useSelector(({ core }) => ({ core }));

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      render: (text, { unit }) => `${text}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => `${text}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => `${text}`,
    },
    {
      title: "Status",
      key: "isActive",
      render: (text, { isActive }) => {
        return (
          <Space className="icon-btn cursor-pointer" size="middle">
            <Tag
              className="text-capitalize"
              style={{ borderRadius: "50px", padding: "8px 16px" }}
              color={isActive ? "success" : "warning"}
            >
              {isActive ? "Active" : "Inactive"}
            </Tag>
          </Space>
        );
      },
    },
  ];

  const { Option } = Select;
  const [newUserForm] = Form.useForm();
  const [newUserVisible, setNewUserVisible] = useState(false);

  const handleNewUser = () => {};

  return (
    <DashboardLayout>
      <div className="d-flex flex-column">
        <div className="m-3">
          <Modal
            title="Invite New User"
            visible={newUserVisible}
            onOk={handleNewUser}
            onCancel={() => setNewUserVisible(false)}
            confirmLoading={loading}
            okText="Invite"
            okButtonProps={{
              style: {
                backgroundColor: "#ffffff !important",
              },
            }}
          >
            <Form form={newUserForm}>
              <Form.Item
                name="first_name"
                rules={[{ required: true, message: "First name is required" }]}
                hasFeedback
              >
                <Input size="large" placeholder="First name" />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[{ required: true, message: "Last name is required" }]}
                hasFeedback
              >
                <Input size="large" placeholder="Last name" />
              </Form.Item>
              <Form.Item
                name="email"
                className="label"
                rules={[
                  {
                    required: true,
                    message: "Please provide your email address",
                  },
                  {
                    type: "email",
                    message: "Please provide valid email address",
                  },
                ]}
                hasFeedback
              >
                <Input
                  className="input"
                  size="large"
                  placeholder="Enter your email"
                />
              </Form.Item>{" "}
              <Form.Item
                name="role"
                rules={[{ required: true, message: "Role is required" }]}
                hasFeedback
              >
                <Select
                  showSearch
                  className="w-100"
                  size="large"
                  placeholder="Select role"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option key={"1"} value={"admin"}>
                    Administrator
                  </Option>
                  <Option key={"2"} value={"shareholder"}>
                    Shareholder
                  </Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>

          <Button
            onClick={() => setNewUserVisible(true)}
            type="primary"
            style={{ marginBottom: 16 }}
            className="w-25"
          >
            Add New User
          </Button>
          <Table columns={columns} dataSource={[]} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
