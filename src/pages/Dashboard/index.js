import React, { useEffect, useState } from "react";
import { Progress, Modal, Input } from "antd";
import {
  MoneyCollectFilled,
  VerifiedOutlined,
  UsergroupAddOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import DashboardLayout from "layouts/DashboardLayout";
import { Bar } from "react-chartjs-2";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  findWalletData,
  findTotalWallet,
  depositMoney,
} from "redux/action/walletAction";
import { findAllUsersAction } from "redux/action/authAction";
import { findAllRequests } from "redux/action/loanAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    core: { loading },
    wallet,
    auth: { allUsers },
    loan: { allRequests },
  } = useSelector(
    ({
      core: { loading },
      wallet,
      auth: { allUsers },
      loan: { allRequests },
    }) => ({
      core: { loading },
      wallet,
      auth: { allUsers },
      loan: { allRequests },
    })
  );

  useEffect(() => {
    findWalletData()(dispatch);
    findTotalWallet()(dispatch);
    findAllUsersAction()(dispatch);
    findAllRequests()(dispatch);
    setIsModalVisible(false);
  }, [wallet.deposit]);

  const analyticData = {
    labels: allRequests?.data?.map((item) => item.createdAt.split("T")[0]),
    datasets: [
      {
        label: "Amount",
        data: allRequests?.data?.map((item) => item.amount_borrowed),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleDeposit = () => {
    depositMoney({ amount: Number(amount) })(dispatch);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [amount, setAmount] = useState(0);
  return (
    <DashboardLayout>
      <div className="d-flex flex-column">
        <div className="page-ov">
          <h4>Dashboard Overview</h4>
          <p className="text-gray">Hi there, Welcome back!</p>
        </div>
        <Modal
          title="Deposit money"
          visible={isModalVisible}
          onOk={handleDeposit}
          onCancel={handleCancel}
          okText={"Deposit"}
        >
          <Input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount"
          />
        </Modal>
        <div className="d-flex flex-column mx-4 mt-4">
          <div className="d-flex flex-row justify-content-around">
            <div className="overview-container">
              <h5 className="p-2 section-title">Your overview</h5>
              <div className="d-flex flex-row justify-content-evenly">
                <div className="cstm-card">
                  <h6 className="p-2">Revenue</h6>
                  <span className="ov-data">
                    <div
                      className="icon-container"
                      style={{
                        color: "rgb(72, 105, 255)",
                        backgroundColor: "rgb(181, 215, 255)",
                      }}
                    >
                      <MoneyCollectFilled />
                    </div>

                    <label htmlFor="">
                      <strong>
                        RWF{" "}
                        {wallet?.revenue?.data?.totalRevenue
                          ? wallet?.revenue?.data?.totalRevenue
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : 0}
                      </strong>
                    </label>
                  </span>
                </div>
                <div className="cstm-card">
                  <h6 className="p-2">Clients</h6>
                  <span className="ov-data">
                    <div
                      className="icon-container"
                      style={{
                        color: "green",
                        backgroundColor: "rgba(181, 255, 239, 0.438)",
                      }}
                    >
                      <VerifiedOutlined />
                    </div>

                    <label htmlFor="">
                      <strong>{allUsers ? allUsers.data.length : 0}</strong>
                    </label>
                  </span>
                </div>
                <div className="cstm-card">
                  <h6 className="p-2">Requests</h6>
                  <span className="ov-data">
                    <div
                      className="icon-container"
                      style={{
                        color: "orange",
                        backgroundColor: "rgba(255, 228, 196, 0.452)",
                      }}
                    >
                      <UsergroupAddOutlined />
                    </div>

                    <label htmlFor="">
                      <strong>
                        {allRequests ? allRequests.data.length : 0}
                      </strong>
                    </label>
                  </span>
                </div>
              </div>
            </div>
            <div className=" balance-container">
              <span>
                <h5 className="p-2 section-title">Total Balance</h5>{" "}
                <label className="text-gray px-2">
                  {new Date().toDateString()}
                </label>
              </span>
              <div className="bal-card">
                <h3 className="section-title text-center pt-4 text-light">
                  RWF{" "}
                  {wallet?.myWallet?.data?.balance
                    ? wallet?.myWallet?.data?.balance
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : 0}
                </h3>
                <p className="text-center text-semi-light px-2">
                  Your active balance
                </p>
                <p className="text-center">
                  <PlusCircleOutlined
                    onClick={() => setIsModalVisible(true)}
                    style={{ fontSize: "19px" }}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-around">
            {/* analytics */}
            <div className="analytics-container">
              <span>
                <h5 className="p-2 section-title">Request analytics</h5>{" "}
                <label className="text-gray px-2">Total requests</label>
              </span>
              <Bar data={analyticData} className="" />
            </div>

            {/* allocations */}
            <div className="allocation-container">
              <span>
                <h5 className="p-2 section-title">Loan Allocation</h5>{" "}
              </span>
              <div className="d-flex justify-content-between w-100">
                <span className="text-gray px-2">Allocation name</span>
                <span className="text-gray px-2">Progress</span>
              </div>
              <hr />

              {allRequests?.data?.map((request, index) => (
                <div
                  key={index}
                  className="d-flex flex-row justify-content-between mx-3 mt-3"
                >
                  <div className="w-100">
                    <strong>
                      {request.first_name} {request.last_name}
                    </strong>
                    <Progress
                      percent={(
                        (request.amount_paid / request.total_amount_to_pay) *
                        100
                      ).toFixed(1)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
