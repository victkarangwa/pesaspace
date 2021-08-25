import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "assets/styles/globalStyles.scss";
import Helmet from "react-helmet";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/Error/500";
import store from "redux/store";

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <Helmet titleTemplate=" Pesa Space | %s" />
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <Router>
        <Routes />
      </Router>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
