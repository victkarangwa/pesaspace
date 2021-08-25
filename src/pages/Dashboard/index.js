import React from "react";
import DashboardLayout from "layouts/DashboardLayout";
import "./style.scss";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="page-ov">
        <h4>Dashboard Overview</h4>
        <p className="text-gray">Hi there, Welcome back!</p>
      </div>

      <div className="d-flex flex-column mx-4">
        <div className="d-flex flex-row justify-content-around">
          <div className="w-75">your overview</div>
          <div className="w-25">total balance</div>
        </div>
        <div className="d-flex flex-row justify-content-around">
          <div className="w-50">payment analytics</div>
          <div className="w-50">Allocation Loan</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
