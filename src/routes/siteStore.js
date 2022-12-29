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

import ConstructionIcon from "@mui/icons-material/Construction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TelegramIcon from "@mui/icons-material/Telegram";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
// Dashboards components
const Default = async(() => import("../pages/dashboards/Site/Default"));
const Analytics = async(() => import("../pages/dashboards/Site/Analytics"));

// Protected routes
import ReqForm from "../pages/dashboards/Site/Requisition/ReqForm";
import Consumable from "../pages/dashboards/Site/Inventory/Consumable";
import NonConsumable from "../pages/dashboards/Site/Inventory/NonConsumable";
import LoanRequest from "../pages/dashboards/Site/LoanRequest/LoanRequest";
import LoanApprove from "../pages/dashboards/Site/LoanApprove/LoanApprove";
import LoanReqTable from "../pages/dashboards/Site/LoanReqTable/LoanReqTable";
import ApprovedLone from "../pages/dashboards/Site/LoanApprove/ApprovedLone/ApprovedLone";
import LoanReturn from "../pages/dashboards/Site/LoanReturn/LoanReturn";
import MaterialIssue from "../pages/dashboards/Site/MaterialIssue/MaterialIssue";
import MaterialConsumableAccept from "../pages/dashboards/Site/MaterialAccept/MaterialConsumableAccept";
import MaterialNonConsumableAccept from "../pages/dashboards/Site/MaterialAccept/MaterialNonConsumableAccept";
import MaterialDestroy from "../pages/dashboards/Site/MaterialDestroy/MaterialDestroy";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";

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

const loanRequest = {
  id: "Request A Loan",
  path: "/loan-request",
  icon: <ShoppingCartIcon />,
  component: LoanRequest,
  children: null,
};

const approveLoan = {
  id: "Loan Inventory",
  path: "/loan-approval",
  icon: <VerifiedIcon />,
  children: [
    {
      path: "/approve-loan",
      name: "Stakes Loan",
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
  id: "Loan Req Received",
  path: "/loan-request-table",
  icon: <ArchiveIcon />,
  component: LoanReqTable,
};

const loanReturn = {
  id: "Loan Returns",
  path: "/loan-return",
  icon: <TelegramIcon />,
  component: LoanReturn,
};

const materialIssue = {
  id: "Material Issue",
  path: "/material-issue",
  icon: <DirectionsRunIcon />,
  component: MaterialIssue,
};

const materialAccept = {
  id: "Material Accept",
  path: "/material-accept",
  icon: <InstallDesktopIcon />,
  children: [
    {
      path: "/consumable-accept",
      name: "Consumable",
      component: MaterialConsumableAccept,
    },
    {
      path: "/non-consumable-accept",
      name: "Non Consumable",
      component: MaterialNonConsumableAccept,
    },
  ],
};

const materialDamage = {
  id: "Material Damaged",
  path: "/material-damage",
  icon: <DoDisturbIcon />,
  component: MaterialDestroy,
};

const landingRoutes = {
  id: "Landing Page",
  path: "/",
  header: "Docs",
  icon: <Monitor />,
  component: null,
  children: null,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  // siteInventoryRoute,
  requsitionForm,
  consumableRoute,
  non_consumablesRoute,
  materialIssue,
  materialAccept,
  loanRequest,
  approveLoan,
  loanReqTable,
  loanReturn,
  materialDamage,
];

// Routes using the Auth layout
export const authLayoutRoutes = [];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  // siteInventoryRoute,
  materialAccept,
  consumableRoute,
  non_consumablesRoute,
  materialIssue,
  requsitionForm,
  loanRequest,
  approveLoan,
  loanReqTable,
  loanReturn,
  materialDamage,
];
