import React from "react";
import { Progress } from "antd";
import {
  MoneyCollectFilled,
  VerifiedOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import DashboardLayout from "layouts/DashboardLayout";
import { Bar } from "react-chartjs-2";
import "./style.scss";

const Dashboard = () => {

  const analyticData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: 'requests',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <DashboardLayout>
      <div className="d-flex flex-column">
        <div className="page-ov">
          <h4>Dashboard Overview</h4>
          <p className="text-gray">Hi there, Welcome back!</p>
        </div>

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
                      <strong>RWF12,3000</strong>
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
                      <UsergroupAddOutlined />
                    </div>

                    <label htmlFor="">
                      <strong>9821</strong>
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
                      <strong>192</strong>
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
                <h3 className="section-title text-center py-4 text-light">
                  RWF 98,200.00
                </h3>
                <p className="text-center text-semi-light px-2">
                  Your active balance
                </p>
              </div>
            </div>
          </div>


          <div className="d-flex flex-row justify-content-around">

            {/* analytics */}
            <div className="analytics-container">
              <span>
                <h5 className="p-2 section-title">payment analytics</h5>{" "}
                <label className="text-gray px-2">Total payment</label>
              </span>
              <Bar data={analyticData} className="" />
            </div>

                        {/* allocations */}
            <div className="allocation-container">
              <span>
                <h5 className="p-2 section-title">Total Balance</h5>{" "}
              </span>
              <div className="d-flex justify-content-between w-100">
                <span className="text-gray px-2">Allocation name</span>
                <span className="text-gray px-2">Progress</span>
              </div>
              <hr />

              <div className="d-flex flex-row justify-content-between mx-3">
                <div className="w-100">
                  <strong>John Doe</strong>
                  <Progress percent={30} />
                </div>

                {/* <span>
                  <strong>80.82%</strong>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
