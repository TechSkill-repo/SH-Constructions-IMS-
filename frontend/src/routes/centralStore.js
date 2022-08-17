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

import ImportContactsIcon from "@material-ui/icons/ImportContacts";

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Guards
import AuthGuard from "../components/AuthGuard";
import Inventory from "../pages/dashboards/Central/Inventory/Inventory";

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
const projectsRoutes = {
  id: "Inventory",
  path: "/analytics",
  icon: <Briefcase />,
  component: Analytics,
  children: null,
};

const orderRoutes = {
  id: "Material requests",
  path: "/orders",
  icon: <ShoppingCart />,
  component: Inventory,
  children: null,
};

const authRoutes = {
  id: "Material Issue",
  path: "/material-issue",
  icon: <Users />,
  children: null,
  component: TextFields,
};

const consumables = {
  id: "Consumables Items",
  path: "/material-issue",
  icon: <Users />,
  children: null,
  component: TextFields,
};

const non_consumables = {
  id: "Non-Consumables Items",
  path: "/material-issue",
  icon: <Users />,
  children: null,
  component: TextFields,
};

const componentsRoutes = {
  id: "Critical Tools",
  path: "/critical-tools",
  icon: <Grid />,
  children: [
    {
      path: "/simpleTables",
      name: "Tool 1",
      component: SimpleTable,
    },
    {
      path: "/simpleTables",
      name: "Tool 2",
      component: SimpleTable,
    },
    {
      path: "/simpleTables",
      name: "Tool 3",
      component: SimpleTable,
    },
  ],
  component: null,
};

const chartRoutes = {
  id: "Monitor Inventory",
  path: "/monitorInventory",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
};

// const monitorInventory = {
//   id: "Store Inventory",
//   path: "/monitorInventory",
//   icon: <PieChart />,
//   component: Chartjs,
//   children: null,
// };

const monitorStoreLone = {
  id: "Monitor Store Lone",
  path: "/monitorInventory",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
};

const profile = {
  id: "Material Request",
  path: "/monitorInventory",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
};

const notes = {
  id: "Remarks",
  path: "/monitorInventory",
  icon: <ImportContactsIcon />,
  component: Chartjs,
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
  projectsRoutes,
  orderRoutes,

  componentsRoutes,
  chartRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  projectsRoutes,
  orderRoutes,
  consumables,
  non_consumables,
  // monitorInventory,
  authRoutes,
  componentsRoutes,
  chartRoutes,
  monitorStoreLone,
  profile,
  notes,
];
