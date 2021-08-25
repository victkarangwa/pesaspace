/* eslint react/prop-types: 0 */
import React, { Component, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "components/Error/404";
import { PublicRoute, ProtectedRoute } from "routes/router";

export default class index extends Component {
  render() {
    return (
      <Switch>
        {/* <PublicRoute
          path={["/", "/home"]}
          exact
          component={lazy(() => import("pages/Landing"))}
        /> */}

        <PublicRoute
          path={"/dashboard"}
          exact
          component={lazy(() => import("pages/Dashboard"))}
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
