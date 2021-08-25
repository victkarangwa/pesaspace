/* eslint-disable react/prop-types */
import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import Spinner from "components/Spinner";

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
  return (
    <Route
      {...rest}
      render={(props) =>
        props.location.state ? (
          <Suspense fallback={<Spinner/>}>
            <Component {...props} />
          </Suspense>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
