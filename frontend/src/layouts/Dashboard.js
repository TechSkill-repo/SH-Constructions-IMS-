import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import Sidebar from "../components/Sidebar";
import Header from "../components/AppBar";
import Footer from "../components/Footer";
import Settings from "../components/Settings";

import { spacing } from "@material-ui/system";
import {
  Hidden,
  CssBaseline,
  Paper as MuiPaper,
  withWidth,
} from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";
import {
  adminApproval,
  centralStoreRequisition,
  siteStoreRequisition,
  centralStoreApproval,
  siteLoanApproval,
  siteLoanRequest,
  siteLoanReturn
} from "../services/socketService";

import { useDispatch } from "react-redux";

import { add as adminAdd } from "../redux/reducers/adminReducer";
import { add as centralAdd } from "../redux/reducers/centralReducer";
import { add as siteAdd } from "../redux/reducers/siteReducer";

const drawerWidth = 258;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children, routes, width }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Admin
    centralStoreRequisition(() => {
      dispatch(adminAdd('Central Store Requisition'));
    });

    // Central
    adminApproval(() => {
      dispatch(centralAdd('Admin approval'));
    });

    siteStoreRequisition(() => {
      dispatch(centralAdd('Site Requisition'));
    });

    // Site
    centralStoreApproval(() => {
      dispatch(siteAdd('Central Approval'));
    });

    siteLoanRequest((storeId) => {
      if (storeId != user.storeId) {
        dispatch(siteAdd('Site Loan Request'));
      }
    });

    siteLoanApproval((storeId) => {
      if (storeId != user.storeId) {
        dispatch(siteAdd('Site Loan Approval'));
      }
    });

    siteLoanReturn((storeId) => {
      if (storeId != user.storeId) {
        dispatch(siteAdd('Site Loan Return'));
      }
    });
  }, []);

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Hidden mdUp implementation="js">
          <Sidebar
            routes={routes}
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar
            routes={routes}
            PaperProps={{ style: { width: drawerWidth } }}
          />
        </Hidden>
      </Drawer>
      <AppContent>
        <Header onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isWidthUp("lg", width) ? 12 : 5}>
          {children}
        </MainContent>
        <Footer />
      </AppContent>
      <Settings />
    </Root>
  );
};

export default withWidth()(Dashboard);
