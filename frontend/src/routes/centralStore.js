import React from "react";

import async from "../components/Async";

import {
  Briefcase,
  Calendar as CalendarIcon,
  Monitor,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
} from "react-feather";

import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import ConstructionIcon from "@mui/icons-material/Construction";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import EngineeringIcon from "@mui/icons-material/Engineering";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Guards
import AuthGuard from "../components/AuthGuard";

// Dashboards components
const Default = async(() => import("../pages/dashboards/Central/Default"));
const Analytics = async(() => import("../pages/dashboards/Central/Analytics"));

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
import Inventory from "../pages/dashboards/Central/Inventory/Inventory";
import MaterialRequest from "../pages/dashboards/Central/MaterialRequest/MaterialRequest";
import MaterialIssue from "../pages/dashboards/Central/MaterialIssue/MaterialIssue";
import ConsumablesItems from "../pages/dashboards/Central/ConsumablesItems/ConsumablesItems";
import NonConsumable from "../pages/dashboards/Central/Non-Consumables/NonConsumable";
import CriticalTools from "../pages/dashboards/Central/CriticalTools/CriticalTools";
import MonitorLone from "../pages/dashboards/Central/MonitorLone/MonitorLone";
import MaterialReqForm from "../pages/dashboards/Central/MaterialReqForm/MaterialReqForm";
import Remarks from "../pages/dashboards/Central/Remarks/Remarks";
import MRConsumable from "../pages/dashboards/Central/MaterialRequest/Consumable";
import MRNonConsumable from "../pages/dashboards/Central/MaterialRequest/NonConsumable";

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
const inventory = {
  id: "Inventory",
  path: "/inventory",
  icon: <Briefcase />,
  component: Inventory,
  children: null,
};

const materialRequest = {
  id: "Material Requests",
  path: "/materialRequest",
  component: MaterialRequest,
  icon: <ShoppingCart />,
  children: [
    {
      path: "/consumables",
      name: "Consumables",
      component: MRConsumable,
    },
    {
      path: "/non-consumables",
      name: "Non-Consumables",
      component: MRNonConsumable,
    },
  ],
};

const materialIssue = {
  id: "Material Issue",
  path: "/material-issue",
  icon: <AssignmentTurnedInRoundedIcon />,
  children: [
    {
      path: "/consumables",
      name: "Consumables",
      component: MaterialIssue,
    },
    {
      path: "/non-consumables",
      name: "Non-Consumables",
      component: MaterialIssue,
    },
  ],
};

const consumables = {
  id: "Consumables Items",
  path: "/consumables-items",
  icon: <ConstructionIcon />,
  children: null,
  component: ConsumablesItems,
};

const non_consumables = {
  id: "Non-Consumables Items",
  path: "/non-consumables-items",
  icon: <EngineeringIcon />,
  children: null,
  component: NonConsumable,
};

const criticalTools = {
  id: "Critical Tools",
  path: "/critical-tools",
  icon: <FireplaceIcon />,
  component: null,
  component: CriticalTools,
};

const chartRoutes = {
  id: "Monitor Inventory",
  path: "/monitorInventory",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
};

const monitorStoreLone = {
  id: "Monitor Store Lone",
  path: "/monitor-lone",
  icon: <VolunteerActivismIcon />,
  children: null,
  component: MonitorLone,
};

const requisitionForm = {
  id: "Requisition Form",
  path: "/requisition-form",
  icon: <InsertDriveFileIcon />,
  component: MaterialReqForm,
  children: null,
};

const notes = {
  id: "Remarks",
  path: "/remarks",
  icon: <ImportContactsIcon />,
  component: Remarks,
  children: null,
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
  inventory,
  materialRequest,
  consumables,
  materialIssue,
  criticalTools,
  non_consumables,
  monitorStoreLone,
  requisitionForm,
  chartRoutes,
  notes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [materialIssue];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  inventory,
  materialRequest,
  consumables,
  non_consumables,
  // monitorInventory,
  materialIssue,
  criticalTools,
  chartRoutes,
  monitorStoreLone,
  requisitionForm,
  notes,
];
