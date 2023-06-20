import React from "react";

import async from "../components/Async";

import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  Monitor,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
} from "react-feather";

import FireplaceIcon from "@mui/icons-material/Fireplace";

// Dashboards components
const Default = async(() => import("../pages/dashboards/Admin/Default"));
const AccountDetails = async(() =>
  import("../pages/dashboards/Admin/Default/AccountDetails")
);
const Analytics = async(() => import("../pages/dashboards/Admin/Analytics"));
const SaaS = async(() => import("../pages/dashboards/SaaS"));
import GridViewIcon from "@mui/icons-material/GridView";
import ConsumableTable from "../pages/dashboards/Admin/MaterialRequest/ConsumableTable";
import NonConsumableTable from "../pages/dashboards/Admin/MaterialRequest/NonConsumableTable";
import MaterialAccepted from "../pages/dashboards/Admin/MaterialAccepted/MaterialAccepted";
import CriticalTools from "../pages/dashboards/Admin/CriticalTools/CriticalTools";
import CriticalTool from "../pages/dashboards/Admin/CriticalTools/CriticalTool";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MonitorLone from "../pages/dashboards/Central/MonitorLone/MonitorLone";
import ProductList from "../pages/dashboards/Central/ProductList/ProductList";
import MaterialIssue from "../pages/dashboards/Central/MaterialIssue/MaterialIssue";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import MIConsumable from "../pages/dashboards/Central/MaterialIssue/MIConsumable";
import MINonConsumable from "../pages/dashboards/Central/MaterialIssue/MINonConsumable";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ContactsIcon from "@mui/icons-material/Contacts";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HandymanIcon from "@mui/icons-material/Handyman";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonitorStorLonConsumable from "../pages/dashboards/Admin/MonitorStorInventory/MonitorStorLonConsumable";
import MonitorStorLonNonConsumable from "../pages/dashboards/Admin/MonitorStorInventory/MonitorStorLonNonConsumable";
import Consumable from "../pages/dashboards/Admin/MonitorStorInventory/Consumable";
import NonConsumable from "../pages/dashboards/Admin/MonitorStorInventory/NonConsumable";
import UserInfo from "../pages/dashboards/Admin/UserInfo/UserInfo";

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

const amount = {
  id: "Account Details",
  path: "/accounts",
  icon: <AccountBalanceIcon />,
  component: AccountDetails,
};

const consumables = {
  id: "Consumables Items",
  path: "/consumable",
  icon: <EngineeringIcon />,
  children: null,
  component: ConsumableTable,
};

const non_consumables = {
  id: "Non-Consumables",
  path: "/non-consumable",
  icon: <HandymanIcon />,
  children: null,
  component: NonConsumableTable,
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

const materialAccepted = {
  id: "Monitor Materials",
  path: "/material-accept",
  icon: <Monitor />,
  component: MaterialAccepted,
};

const monitorStoreLone = {
  id: "Monitor Store Lone",
  path: "/monitor-lone",
  icon: <VolunteerActivismIcon />,
  children: null,
  component: MonitorLone,
};

const productList = {
  id: "Material List",
  path: "/product-list",
  icon: <ImportContactsIcon />,
  component: ProductList,
  children: null,
};

const monitorStoreInventory = {
  id: "Store Inventory",
  path: "/store-inventory",
  icon: <GridViewIcon />,
  children: [
    {
      path: "/store-inventory/consumabales",
      name: "Consumables",
      component: MonitorStorLonConsumable,
    },
    {
      path: "/store-inventory/non-consumables",
      name: "Non-Consumables",
      component: MonitorStorLonNonConsumable,
    },
  ],
};
const monitor_Store_Inventory_Consumable = {
  id: "store in inventory",
  path: "/store-inventory/consumable/:storeId",
  children: null,
  component: Consumable,
};

const monitor_Store_Inventory_NonConsumable = {
  id: "store in inventory",
  path: "/store-inventory/non-consumable/:storeId",
  children: null,
  component: NonConsumable,
};

// const monitor_Store_Inventory = {
//   id: "store in inventory",
//   path: "/store-inventory/non-consumables/:storeId",
//   children: null,
//   component: NonConsumable,
// };

const details = {
  id: "Users Information",
  path: "/user-info",
  icon: <ContactsIcon />,
  component: UserInfo,
};

// const materialDamaged = {
//   id: "Damage Materials",
//   path: "/damage-materials",
//   icon: <RemoveCircleOutlineIcon />,
//   component: null,
// };

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
  amount,
  criticalTools,
  consumables,
  non_consumables,
  materialAccepted,
  monitorStoreLone,
  criticalTool,
  productList,
  monitorStoreInventory,
  // materialDamaged,
  details,
  monitor_Store_Inventory_Consumable,
  monitor_Store_Inventory_NonConsumable,
];

// Routes using the Auth layout

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  amount,
  consumables,
  non_consumables,
  materialAccepted,
  criticalTools,
  monitorStoreLone,
  productList,
  monitorStoreInventory,
  // materialDamaged,
  details,
];