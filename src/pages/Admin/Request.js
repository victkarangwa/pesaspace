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
  DeleteColumnOutlined,
  VerifiedOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import DashboardLayout from "layouts/DashboardLayout/AdminLayout";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Button from "components/Button";
import {
  findAllRequests,
  acceptOrRejectRequest,
} from "redux/action/loanAction";

const Requests = () => {
  const dispatch = useDispatch();

  const [reason, setReason] = useState("");

  const {
    core: { loading },
    loan: { allRequests, actionedRequest },
  } = useSelector(({ core, loan: { allRequests, actionedRequest } }) => ({
    core,
    loan: { allRequests, actionedRequest },
  }));

  useEffect(() => {
    findAllRequests()(dispatch);
  }, [actionedRequest]);



  const handleAcceptOrReject = (record, action) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>
            Are you sure you want to {action} this request from "
            {record.first_name} {record.last_name}" ?
          </p>
          {action === "reject" && (
            <p>
              <Input.TextArea
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for rejection"
              />
            </p>
          )}
        </>
      ),
      okText: `Yes, ${action}`,
      cancelText: "Cancel",
      onOk: () => {
        acceptOrRejectRequest(record.id, action, reason)(dispatch);
      },
    });
  };

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
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    //   render: (text) => `${text}`,
    // },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => `${text}`,
    },
    {
      title: "Amount(RWF)",
      dataIndex: "amount_borrowed",
      key: "amount",
      render: (text) => `${text}`,
    },
    // {
    //   title: "Paid",
    //   dataIndex: "paid",
    //   key: "paid",
    //   render: (amount) => (amount > 0 ? amount : "N/A"),
    // },
    {
      title: "Status",
      key: "isActive",
      render: (text, { status }) => {
        return (
          <Space className="icon-btn cursor-pointer" size="middle">
            <Tag
              className="text-capitalize"
              style={{ borderRadius: "50px", padding: "8px 16px" }}
              color={
                status === "accepted"
                  ? "success"
                  : status === "pending"
                  ? "warning"
                  : "error"
              }
            >
              {status}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: "RRA Flag",
      dataIndex: "paid",
      key: "paid",
      render: (hasRRAflag) => (hasRRAflag ? "Issue" : "Cleared"),
    },
    {
      title: "CRB Flag",
      dataIndex: "paid",
      key: "paid",
      render: (hasCRBflag) => (hasCRBflag ? "Issue" : "Cleared"),
    },
    {
      title: "Action",
      dataIndex: "role",
      key: "role",
      render: (text, record) => {
        const isPending = record.status === "pending";
        return (
          <Space size="middle">
            {isPending ? (
              <>
                <Button
                  onClick={() => handleAcceptOrReject(record, "accept")}
                  icon={<VerifiedOutlined />}
                >
                  Accept
                </Button>

                <Button
                  onClick={() => handleAcceptOrReject(record, "reject")}
                  icon={<DeleteColumnOutlined />}
                  danger
                >
                  Reject
                </Button>
              </>
            ) : (
              "-"
            )}
          </Space>
        );
      },
    },
  ];

  const { Option } = Select;

  return (
    <DashboardLayout>
      <h3 className="p-3">Loan Requests</h3>
      <div className="d-flex flex-column">
        <div className="m-3">
          <Table
            columns={columns}
            dataSource={allRequests?.data}
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Requests;
