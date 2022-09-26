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
import GridViewIcon from "@mui/icons-material/GridView";
import ConstructionIcon from "@mui/icons-material/Construction";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import EngineeringIcon from "@mui/icons-material/Engineering";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Dashboards components
const Default = async(() => import("../pages/dashboards/Central/Default"));
const Analytics = async(() => import("../pages/dashboards/Central/Analytics"));

// Protected routes
import ConsumablesItems from "../pages/dashboards/Central/ConsumablesItems/ConsumablesItems";
import NonConsumable from "../pages/dashboards/Central/Non-Consumables/NonConsumable";
import CriticalTools from "../pages/dashboards/Central/CriticalTools/CriticalTools";
import CriticalTool from "../pages/dashboards/Central/CriticalTools/CriticalTool";
import MonitorLone from "../pages/dashboards/Central/MonitorLone/MonitorLone";
import ReqFrom from "../pages/dashboards/Central/Requisition/ReqForm";
import Remarks from "../pages/dashboards/Central/Remarks/Remarks";
import MRConsumable from "../pages/dashboards/Central/MaterialRequest/Consumable";
import MRNonConsumable from "../pages/dashboards/Central/MaterialRequest/NonConsumable";
import ConsumableTable from "../pages/dashboards/Central/MaterialRequest/ConsumableTable";
import NonConsumableTable from "../pages/dashboards/Central/MaterialRequest/NonConsumableTable";
import MIConsumable from "../pages/dashboards/Central/MaterialIssue/MIConsumable";
import MINonConsumable from "../pages/dashboards/Central/MaterialIssue/MINonConsumable";
import MIConsumbaleTable from "../pages/dashboards/Central/MaterialIssue/MIConsumableTable";
import MINonConsumableTable from "../pages/dashboards/Central/MaterialIssue/MINonConsumableTable";
import Allproducts from "../pages/dashboards/Central/AllProducts/Allproducts";
import AcceptConsumableTable from "../pages/dashboards/Central/AcceptMaterials/AcceptConsumable";
import AcceptNonConsumableTable from "../pages/dashboards/Central/AcceptMaterials/AcceptNonConsumable";
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
const materialRequest = {
  id: "Material Requests",
  path: "/materialRequest",
  component: null,
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
  icon: <GridViewIcon />,
  children: [
    {
      path: "/mi-consumables",
      name: "Consumables",
      component: MIConsumable,
    },
    {
      path: "/mi-non-consumables",
      name: "Non-Consumables",
      component: MINonConsumable,
    },
  ],
};

const consumables = {
  id: "Consumables",
  path: "/consumables-items",
  icon: <ConstructionIcon />,
  children: null,
  component: ConsumablesItems,
};

const non_consumables = {
  id: "Non-Consumables",
  path: "/non-consumables-items",
  icon: <EngineeringIcon />,
  children: null,
  component: NonConsumable,
};

const consumableTable = {
  id: "Consumable Table",
  path: "/consumables-table/:storeId",
  children: null,
  component: ConsumableTable,
};

const non_consumableTable = {
  id: "Non-Consumable Table",
  path: "/non-consumables-table/:storeId",
  children: null,
  component: NonConsumableTable,
};

const mi_consumableTable = {
  id: "Consumable Table",
  path: "/mi-consumables-table/:storeId",
  children: null,
  component: MIConsumbaleTable,
};

const mi_non_consumableTable = {
  id: "Non-Consumable Table",
  path: "/mi-non-consumables-table/:storeId",
  children: null,
  component: MINonConsumableTable,
};

const criticalTools = {
  id: "Critical Tools",
  path: "/critical-tools",
  icon: <FireplaceIcon />,
  component: null,
  component: CriticalTools,
};

const criticalTool = {
  id: "Critical Tool",
  path: "/critical-tool/:productId",
  children: null,
  component: CriticalTool,
};

const allProducts = {
  id: "All Products",
  path: "/all-products",
  icon: <ShoppingCart />,
  component: Allproducts,
};

const acceptMaterials = {
  id: "Material App & Rec",
  path: "/accept",
  icon: <InstallDesktopIcon />,
  children: [
    {
      path: "/accept-consumables",
      name: "Consumables",
      component: AcceptConsumableTable,
    },
    {
      path: "/accept-non-consumables",
      name: "Non-Consumables",
      component: AcceptNonConsumableTable,
    },
  ],
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
  component: ReqFrom,
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
  component: null,
  children: null,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  materialRequest,
  acceptMaterials,
  consumables,
  materialIssue,
  criticalTools,
  non_consumables,
  monitorStoreLone,
  requisitionForm,
  consumableTable,
  non_consumableTable,
  mi_consumableTable,
  mi_non_consumableTable,
  criticalTool,
  allProducts,
];

// Routes using the Auth layout
export const authLayoutRoutes = [materialIssue];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  acceptMaterials,
  consumables,
  non_consumables,
  materialRequest,
  // monitorInventory,
  materialIssue,
  criticalTools,
  monitorStoreLone,
  requisitionForm,
  allProducts,
];
