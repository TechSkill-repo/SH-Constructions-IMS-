import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  dashboardLayoutRoutes,
  authLayoutRoutes,
  presentationLayoutRoutes,
} from "./admin";

import {
  dashboardLayoutRoutes as dL2,
  authLayoutRoutes as aL2, 
  presentationLayoutRoutes as pL2,
} from "./centralStore";

import {
  dashboardLayoutRoutes as dL3,
  authLayoutRoutes as aL3,
  presentationLayoutRoutes as pL3,
} from "./siteStore";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import PresentationLayout from "../layouts/Presentation";
import { Login } from "../pages/auth/Login";

const childRoutes = (Layout, routes) =>
  routes.map(({ component: Component, guard, children, path }, index) => {
    const Guard = guard || React.Fragment;

    return children ? (
      children.map((element, index) => {
        const Guard = element.guard || React.Fragment;
        const ElementComponent = element.component || React.Fragment;

        return (
          <Route
            key={index}
            path={element.path}
            exact
            render={(props) => (
              <Layout>
                <Guard>
                  <ElementComponent {...props} />
                </Guard>
              </Layout>
            )}
          />
        );
      })
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Layout>
            <Guard>
              <Component {...props} />
            </Guard>
          </Layout>
        )}
      />
    ) : null;
  });

const checkUserType = (sessionData) => {
  if (sessionData) {
    const role = JSON.parse(sessionData).role;

    if (role === "Admin")
      return (
        <Switch>
          {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
          {/* {childRoutes(AuthLayout, authLayoutRoutes)} */}
          {childRoutes(PresentationLayout, presentationLayoutRoutes)}
          {/* <Route
            render={() => (
              <AuthLayout>
                <Page404 />
              </AuthLayout>
            )}
          /> */}
        </Switch>
      );
    else if (role === "Central Store")
      return (
        <Switch>
          Central Store
          {childRoutes(DashboardLayout, dL2)}
          {/* {childRoutes(AuthLayout, aL2)} */}
          {childRoutes(PresentationLayout, pL2)}
          {/* <Route
            render={() => (
              <AuthLayout>
                <Page404 />
              </AuthLayout>
            )}
          /> */}
        </Switch>
      );
    else if (role === "Site Store")
      return (
        <Switch>
          Site Store
          {childRoutes(DashboardLayout, dL3)}
          {childRoutes(AuthLayout, aL3)}
          {childRoutes(PresentationLayout, pL3)}
          {/* <Route
            render={() => (
              <AuthLayout>
                <Page404 />
              </AuthLayout>
            )}
          /> */}
        </Switch>
      )
  } else {
    return <Login />;
  }
};

const Routes = () => {
  const sessionData = window.sessionStorage.getItem("user");

  return <Router>{checkUserType(sessionData)}</Router>;
};

export default Routes;
