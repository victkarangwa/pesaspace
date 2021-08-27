/* eslint-disable react/prop-types */
import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import store from "store";
import Spinner from "components/Spinner";
import { decoder as tokenDecoder } from "../utils/tokenDecoder";

// Unrestricted routes
export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Suspense fallback={<Spinner />}>
          <Component {...props} />
        </Suspense>
      )}
    />
  );
};

// Restricted routes, routes with required props
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const tokenData = tokenDecoder();
  return (
    <Route
    {...rest}
    render={(props) =>
      tokenData && tokenData.role === "shareholder" ? (
        <Suspense fallback={<Spinner />}>
          <Component {...props} />
        </Suspense>
      ) : tokenData && tokenData.role === "admin" ? (
        <Redirect to="/admin/users" />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
  );
};

// Admin route
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const tokenData = tokenDecoder();

  return (
    <Route
      {...rest}
      render={(props) =>
        tokenData && tokenData.role === "admin" ? (
          <Suspense fallback={<Spinner />}>
            <Component {...props} />
          </Suspense>
        ) : tokenData && tokenData.role === "shareholder" ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};


