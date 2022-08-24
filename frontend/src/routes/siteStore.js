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

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Guards
import AuthGuard from "../components/AuthGuard";

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
import MaterialLone from "../pages/dashboards/Site/MaterialLone/MaterialLone";

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
  id: "Site Inventory",
  path: "/analytics",
  icon: <Briefcase />,
  component: Analytics,
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
};

const orderRoutes = {
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

const chartRoutes = {
  id: "Material Lone",
  path: "/charts",
  icon: <PieChart />,
  component: MaterialLone,
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
export const authLayoutRoutes = [];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  projectsRoutes,
  orderRoutes,

  componentsRoutes,
  chartRoutes,
];
