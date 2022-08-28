import React from "react";

import async from "../components/Async";

import {
  Briefcase,
  Calendar as CalendarIcon,
  Grid,
  Monitor,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
} from "react-feather";

import AssignmentIcon from "@material-ui/icons/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArchiveIcon from "@mui/icons-material/Archive";
// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Guards
import AuthGuard from "../components/AuthGuard";

import ConstructionIcon from "@mui/icons-material/Construction";
import EngineeringIcon from "@mui/icons-material/Engineering";

// Dashboards components
const Default = async(() => import("../pages/dashboards/Site/Default"));
const Analytics = async(() => import("../pages/dashboards/Site/Analytics"));

// Forms components
import TextFields from "../pages/forms/TextFields";

// Pages components
import Orders from "../pages/pages/Orders";

// Tables components
import SimpleTable from "../pages/tables/SimpleTable";

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Landing
import Landing from "../pages/presentation/Landing";

// Protected routes
import ProtectedPage from "../pages/protected/ProtectedPage";
import ReqForm from "../pages/dashboards/Site/Requisition/ReqForm";
import MaterialLoan from "../pages/dashboards/Site/MaterialLoan/MaterialLoan";
import Consumable from "../pages/dashboards/Site/Inventory/Consumable";
import NonConsumable from "../pages/dashboards/Site/Inventory/NonConsumable";
import LoanRequest from "../pages/dashboards/Site/LoanRequest/LoanRequest";
import LoanApprove from "../pages/dashboards/Site/LoanApprove/LoanApprove";
import LoanReqTable from "../pages/dashboards/Site/LoanReqTable/LoanReqTable";
import ApprovedLone from "../pages/dashboards/Site/LoanApprove/ApprovedLone/ApprovedLone";

const dashboardsRoutes = {
  id: "Dashboard",
  path: "/dashboard",
  icon: <Sliders />,

  containsHome: true,
  children: [
    {
      path: "/",
      name: "Home",
      component: Default,
    },
  ],
  component: null,
};

const consumableRoute = {
  id: "Consumable",
  path: "/consumable",
  name: "Consumable",
  icon: <ConstructionIcon />,
  component: Consumable,
};

const non_consumablesRoute = {
  id: "Non-Consumable",
  path: "/non-consumable",
  name: "Non-Consumable",
  icon: <EngineeringIcon />,
  component: NonConsumable,
};

const requsitionForm = {
  id: "Requisition Form",
  path: "/reqForm",
  icon: <AssignmentIcon />,
  component: ReqForm,
  children: null,
};

const componentsRoutes = {
  id: "Material Issue",
  path: "/tables",
  icon: <Grid />,
  children: [
    {
      path: "/simpleTables",
      name: "Consumable",
      component: SimpleTable,
    },
    {
      path: "/simpleTables",
      name: "Non-Consumable",
      component: SimpleTable,
    },
  ],
  component: null,
};

const loanRequest = {
  id: "Request A Lone",
  path: "/loan-request",
  icon: <ShoppingCartIcon />,
  component: LoanRequest,
  children: null,
};

const approveLoan = {
  id: "Loan Approval",
  path: "/loan-approval",
  icon: <VerifiedIcon />,
  children: [
    {
      path: "/approve-loan",
      name: "Approve A Lone",
      component: LoanApprove,
    },
    {
      path: "/loan-approval",
      name: "Loan Approvals",
      component: ApprovedLone,
    },
  ],
};

const loanReqTable = {
  id: "Loan Requests Received",
  path: "/loan-request-table",
  icon: <ArchiveIcon />,
  component: LoanReqTable,
};

const landingRoutes = {
  id: "Landing Page",
  path: "/",
  header: "Docs",
  icon: <Monitor />,
  component: Landing,
  children: null,
};

// This route is only visible while signed in
const protectedPageRoutes = {
  id: "Private",
  path: "/private",
  component: ProtectedPage,
  children: null,
  guard: AuthGuard,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  // siteInventoryRoute,
  requsitionForm,
  consumableRoute,
  non_consumablesRoute,
  componentsRoutes,
  loanRequest,
  approveLoan,
  loanReqTable,
];

// Routes using the Auth layout
export const authLayoutRoutes = [];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  // siteInventoryRoute,
  consumableRoute,
  non_consumablesRoute,
  requsitionForm,
  componentsRoutes,
  loanRequest,
  approveLoan,
  loanReqTable,
];
