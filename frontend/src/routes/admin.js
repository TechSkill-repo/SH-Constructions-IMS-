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

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Dashboards components
const Default = async(() => import("../pages/dashboards/Admin/Default"));
const Analytics = async(() => import("../pages/dashboards/Admin/Analytics"));
const SaaS = async(() => import("../pages/dashboards/SaaS"));


// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Landing
// import Landing from "../pages/presentation/Landing";

// Protected routes
import MaterialRequest from "../pages/dashboards/Central/MaterialRequest/MaterialRequest";

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
  id: "Admin Inventory",
  path: "/analytics",
  icon: <Briefcase />,
  component: Analytics,
  children: null,
};

const orderRoutes = {
  id: "Material requests",
  path: "/orders",
  icon: <ShoppingCart />,
  component: null,
  children: null,
};

const authRoutes = {
  id: "Material Issue",
  path: "/material-issue",
  icon: <Users />,
  children: null,
  component: null,
};

const consumables = {
  id: "Consumables Items",
  path: "/material-issue",
  icon: <Users />,
  children: null,
  component: null,
};

const non_consumables = {
  id: "Non-Consumables Items",
  path: "/material-issue",
  icon: <Users />,
  children: null,
  component: null,
};

const componentsRoutes = {
  id: "Critical Tools",
  path: "/critical-tools",
  icon: <Grid />,
  children: [
    {
      path: "/simpleTables",
      name: "Tool 1",
      component: null,
    },
    {
      path: "/simpleTables",
      name: "Tool 2",
      component: null,
    },
    {
      path: "/simpleTables",
      name: "Tool 3",
      component: null,
    },
  ],
  component: null,
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
  projectsRoutes,
  orderRoutes,
  componentsRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  projectsRoutes,
  orderRoutes,
  consumables,
  non_consumables,
  authRoutes,
  componentsRoutes,
];
