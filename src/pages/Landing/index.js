import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {UserOutlined} from "@ant-design/icons"
import { Input, Select, Modal, Form } from "antd";
import InvestingIllus from "assets/images/Investing-pana.png";
import MainHeader from "components/MainHeader";
import "./style.scss";
import SearchInput from "components/SearchInput";
import { set } from "store/dist/store.modern.min";
import { useDispatch, useSelector } from "react-redux";
import PublicHeader from "components/PublicHeader";
import {
  trackLoanApplication,
  findNidaInfo,
  applyForAny,
} from "redux/action/loanAction";
import { Link } from "react-router-dom";

const { Option } = Select;

const LandingPage = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [error, setError] = useState("");
  const [loanInfo, setLoanInfo] = useState("");

  const {
    core: { loading },
    loan,
  } = useSelector(({ core: { loading }, loan }) => ({
    core: { loading },
    loan,
  }));

  useEffect(() => {
    if (loan?.nidaInfo) {
      if (loan?.nidaInfo?.data?.first_name) {
        newApplicationForm.setFieldsValue({
          first_name: loan?.nidaInfo?.data?.first_name,
          last_name: loan?.nidaInfo?.data?.last_name,
          dob: loan?.nidaInfo?.data?.dob.split("T")[0],
        });
      }
    }
  }, [loan?.nidaInfo]);

  useEffect(() => {
    setNewApplicationVisible(false);
  }, []);

  useEffect(() => {
    // setNewApplicationVisible(false);
    if (loan?.status !== "fail") {
      setInput("");
      setError("");
      setLoanInfo(loan?.data?.loanInfo);
    }
    if (loan?.status === "fail") {
      setError(loan?.data);
    }
  }, [loan]);

  const findUserdataByNida = (nid) => {
    findNidaInfo(nid)(dispatch);
  };

  const handleSearch = (loan_id) => {
    trackLoanApplication(loan_id)(dispatch);
  };

  const [newApplicationForm] = Form.useForm();
  const [newApplicationVisible, setNewApplicationVisible] = useState(false);

  const handleNewApplication = () => {
    newApplicationForm
      .validateFields()
      .then((payload) => {
        applyForAny(payload)(dispatch);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  return (
    <div>
      <Helmet title="Landing" />
      <PublicHeader setNewApplicationVisible={setNewApplicationVisible} />
      <Modal
        title="Loan application"
        visible={newApplicationVisible}
        onOk={handleNewApplication}
        onCancel={() => setNewApplicationVisible(false)}
        confirmLoading={loading}
        okText="Request"
        okButtonProps={{
          style: {
            backgroundColor: "#ffffff !important",
          },
        }}
      >
        <Form form={newApplicationForm}>
          <Form.Item
            name="nid"
            rules={[{ required: true, message: "NID name is required" }]}
          >
            <Input.Search
              onSearch={findUserdataByNida}
              size="large"
              placeholder="National ID"
              type="number"
              loading={loading}
            />
          </Form.Item>
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input disabled size="large" placeholder="First name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input disabled size="large" placeholder="Last name" />
          </Form.Item>
          <Form.Item name="dob" className="label">
            <Input
              disabled
              className="input"
              size="large"
              placeholder="Date of Birth"
            />
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
          </Form.Item>
          <Form.Item
            name="org_type"
            rules={[
              { required: true, message: "Organization type is required" },
            ]}
            hasFeedback
          >
            <Select
              showSearch
              className="w-100"
              size="large"
              placeholder="Select Organization"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onSelect={(value) => setIsCompany(value === "company")}
            >
              <Option key={"1"} value={"individual"}>
                Individual
              </Option>
              <Option key={"2"} value={"company"}>
                Company
              </Option>
            </Select>
          </Form.Item>
          {isCompany && (
            <Form.Item
              name="tin"
              rules={[{ required: true, message: "TIN number is required" }]}
            >
              <Input size="large" placeholder="TIN" type="number" />
            </Form.Item>
          )}
          <Form.Item
            name="product_id"
            rules={[{ required: true, message: "Product type is required" }]}
            hasFeedback
          >
            <Select
              showSearch
              className="w-100"
              size="large"
              placeholder="Select Product type"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key={"1"} value={"c8f342f1-59a6-4855-a8f1-2c6a1c5e08f8"}>
                10,000 - 50,000
              </Option>
              <Option key={"2"} value={"a5342357-693c-44ad-8231-53fb44b17dd4"}>
                50,000 - 200,000
              </Option>
              <Option key={"3"} value={"beab6ce7-ad11-4425-b2dd-e7524737baa4"}>
                200,000 - 1,000,000
              </Option>
              <Option key={"4"} value={"f5dc4385-940c-433d-abb2-212fbc972003"}>
                1,000,000 - 10,000,000
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="amount_borrowed"
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <Input size="large" placeholder="Amount" type="number" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input size="large" placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Phone number is required" }]}
          >
            <Input size="large" placeholder="phone" />
          </Form.Item>
          <Form.Item
            name="reason"
            rules={[{ required: true, message: "Reason is required" }]}
          >
            <Input.TextArea size="large" placeholder="Reason for loan" />
          </Form.Item>
        </Form>
      </Modal>
      <div className="m-body">
        <div className="d-flex flex-row justify-content-around">
          <div className="m-text">
            <label className="highlight">PESA SPACE</label>{" "}
            <label> Your Money, Your legacy</label>
            <div className="my-5">
              {error ? (
                <span className="text-error error-text">{error}</span>
              ) : null}
              <SearchInput
                onSearch={handleSearch}
                placeholder="Application code (ex:d94a4e42-...)"
                btnText="Search"
                loading={loading}
                input={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {loanInfo?.status ? (
              <div className="l-data">
                <p>
                  Status:{" "}
                  {loanInfo?.status === "accepted" ? (
                    <label className="text-success">Accepted</label>
                  ) : loanInfo?.status === "rejected" ? (
                    <label className="text-danger">Rejected</label>
                  ) : (
                    <label className="text-warning">Pending</label>
                  )}
                </p>
                <p>
                  Names: {loanInfo?.fist_name} {loanInfo?.last_name}
                </p>
                <p>NID: {loanInfo?.nid}</p>
                {/* <p>Amount to requested: {loanInfo?.amount_borrowed}</p> */}
                <p>Amount to pay: RWF {loanInfo?.total_amount_to_pay}</p>
                <p>Penalities: RWF {loan?.data?.penalities || 0}</p>
              </div>
            ) : null}
          </div>

          <img
            width="500px"
            height="500px"
            src={InvestingIllus}
            alt="food illustration"
            className="illisImg"
          />
        </div>

        <div className="text-center pt-5">
          <Link style={{fontSize: "17px"}} to="/login"><UserOutlined/>User Portal</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
