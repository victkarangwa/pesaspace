/* eslint react/prop-types: 0 */
import React, { Component, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "components/Error/404";
import { PublicRoute, PrivateRoute, ProtectedRoute } from "routes/router";

export default class index extends Component {
  render() {
    return (
      <Switch>
        <PublicRoute
          path={["/", "/home"]}
          exact
          component={lazy(() => import("pages/Landing"))}
        />

        <ProtectedRoute
          path={"/dashboard"}
          exact
          component={lazy(() => import("pages/Dashboard"))}
        />

        <PrivateRoute
          path={"/admin/users"}
          exact
          component={lazy(() => import("pages/Admin"))}
        />

        <PrivateRoute
          path={"/admin/requests"}
          exact
          component={lazy(() => import("pages/Admin/Request"))}
        />

        <PublicRoute
          path={"/login"}
          exact
          component={lazy(() => import("pages/Login"))}
        />

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
