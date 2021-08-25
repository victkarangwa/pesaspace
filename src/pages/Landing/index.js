import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Timeline } from "antd";
import InvestingIllus from "assets/images/Investing-pana.png";
import MainHeader from "components/MainHeader";
import "./style.scss";
import SearchInput from "components/SearchInput";
import { set } from "store/dist/store.modern.min";
import { useDispatch, useSelector } from "react-redux";
import PublicHeader from "components/PublicHeader";
import { trackLoanApplication } from "redux/action/loanAction";

const LandingPage = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
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
    if (loan?.status !== "fail") {
      setInput("");
      setError("");
      setLoanInfo(loan?.data?.loanInfo);
    }
    if (loan?.status === "fail") {
      setError(loan?.data);
    }
  }, [loan]);

  const handleSearch = (loan_id) => {
    trackLoanApplication(loan_id)(dispatch);
  };

  return (
    <div>
      <Helmet title="coming soon" />
      <PublicHeader />
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
                <p>Status: {loanInfo?.status}</p>
                <p>
                  Names: {loanInfo?.fist_name} {loanInfo?.last_name}
                </p>
                <p>NID: {loanInfo?.nid}</p>
                <p>Amount to requested: {loanInfo?.amount_borrowed}</p>
                <p>Amount to pay: RWF{loanInfo?.total_amount_to_pay}</p>
                <p>Penalities: {loan?.data?.penalities}</p>
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

        <div></div>
      </div>
    </div>
  );
};

export default LandingPage;
