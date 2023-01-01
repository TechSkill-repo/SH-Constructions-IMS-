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
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { adminStore, adminPersistor } from "../redux/store/adminStore";
import { centralStore, centralPersistor } from "../redux/store/centralStore";
import { siteStore, sitePersistor } from "../redux/store/siteStore";

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
          <Provider store={adminStore}>
            <PersistGate persistor={adminPersistor}>
              {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
              {childRoutes(PresentationLayout, presentationLayoutRoutes)}
            </PersistGate>
          </Provider>
        </Switch>
      );
    else if (role === "Central Store")
      return (
        <Switch>
          <Provider store={centralStore}>
            <PersistGate persistor={centralPersistor}>
              {childRoutes(DashboardLayout, dL2)}
              {childRoutes(PresentationLayout, pL2)}
            </PersistGate>
          </Provider>
        </Switch>
      );
    else if (role === "Site Store")
      return (
        <Switch>
          <Provider store={siteStore}>
            <PersistGate persistor={sitePersistor}>
              {childRoutes(DashboardLayout, dL3)}
              {childRoutes(AuthLayout, aL3)}
              {childRoutes(PresentationLayout, pL3)}
            </PersistGate>
          </Provider>
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
