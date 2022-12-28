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
  centralStoreOverDue,
  centralStoreRequisition,
  siteStoreRequisition,
  centralStoreApproval,
  siteLoanApproval,
  siteLoanRequest,
  siteLoanReturn,
} from "../services/socketService";

import { useDispatch } from "react-redux";

import { add as adminAdd } from "../redux/reducers/adminReducer";
import { add as centralAdd } from "../redux/reducers/centralReducer";
import { add as siteAdd } from "../redux/reducers/siteReducer";

import { ToastContainer, toast } from "react-toastify";
// import toast from 'react-toastify/toast';
import "react-toastify/dist/ReactToastify.css";

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

  const [admin, setAdmin] = useState(false);
  const [central, setCentral] = useState(false);
  const [site, setSite] = useState(false);

  useEffect(() => {
    const sessionData = window.sessionStorage.getItem("user");
    const role = JSON.parse(sessionData).role;
    if (role === "Admin") {
      setAdmin(true);
      setCentral(false);
      setSite(false);
    }
    if (role === "Central Store") {
      setCentral(true);

      setAdmin(false);
      setSite(false);
    }
    if (role === "Site Store") {
      setSite(true);
      setAdmin(false);
      setCentral(false);
    }

    // Admin
    centralStoreRequisition(() => {
      console.log("Central Store Requisition");
      dispatch(adminAdd("Central Store Requisition"));
      console.log("user", admin, role);
      setAdmin(true);
      if (role === "Admin") {
        toast.info("Central Store Requisition", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        console.log("Inside Centeral");
      }
    });

    // Central
    adminApproval(() => {
      dispatch(centralAdd("Admin approval"));

      if (role === "Central Store") {
        toast.success("Admin approval", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log("Inside Admin approval");
      }
    });

    centralStoreOverDue((details) => {
      console.log("Overdue!!!!", details);
      dispatch(
        centralAdd(
          `Overdue: Store- '${details?.storeId}', Make- '${details?.make}'`
        )
      );
      if (role === "Central Store")
        toast.info(
          `Overdue: Store- '${details?.storeId}', Make- '${details?.make}'`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
    });

    siteStoreRequisition(() => {
      dispatch(centralAdd("Site Requisition"));
      if (role === "Central Store")
        toast.info("Site Requisition", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    });

    // Site
    centralStoreApproval(() => {
      dispatch(siteAdd("Central Approval"));
      if (role === "Site Store")
        toast.success("Central Approval", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    });

    siteLoanRequest((storeId) => {
      if (storeId != user.storeId) {
        dispatch(siteAdd("Site Loan Request"));
        if (role === "Site Store")
          toast.info("Site Loan Request", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
      }
    });

    siteLoanApproval((storeId) => {
      if (storeId != user.storeId) {
        dispatch(siteAdd("Site Loan Approval"));
        if (role === "Site Store")
          toast.success("Site Loan Approval", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
      }
    });

    siteLoanReturn((storeId) => {
      if (storeId != user.storeId) {
        dispatch(siteAdd("Site Loan Return"));
        if (role === "Site Store")
          toast.info("Site Loan Return", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
      }
    });
  }, []);

  return (
    <Root>
      <ToastContainer></ToastContainer>
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

        {/* <ToastContainer ></ToastContainer> */}
        <MainContent p={isWidthUp("lg", width) ? 12 : 5}>
          {children}
        </MainContent>
        <Footer />
      </AppContent>
    </Root>
  );
};

export default withWidth()(Dashboard);
