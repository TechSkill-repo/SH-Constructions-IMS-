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

// Dashboards components
const Default = async(() => import("../pages/dashboards/Admin/Default"));
const Analytics = async(() => import("../pages/dashboards/Admin/Analytics"));
const SaaS = async(() => import("../pages/dashboards/SaaS"));

import ConsumableTable from "../pages/dashboards/Admin/MaterialRequest/ConsumableTable";
import MaterialReceiveTable from "../pages/dashboards/Central/MaterialReceive/MaterialReceiveTable";
import NonConsumableTable from "../pages/dashboards/Admin/MaterialRequest/NonConsumableTable";

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

const material = {
  id: "Material Issue",
  path: "/material-receive",
  icon: <Users />,
  children: null,
  component: MaterialReceiveTable,
};

const consumables = {
  id: "Consumables Items",
  path: "/consumable",
  icon: <Users />,
  children: null,
  component: ConsumableTable,
};

const non_consumables = {
  id: "Non-Consumables Items",
  path: "/non-consumable",
  icon: <Users />,
  children: null,
  component: NonConsumableTable,
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
  componentsRoutes,
  material,
  consumables,
  non_consumables,
];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  projectsRoutes,
  consumables,
  material,
  non_consumables,
  componentsRoutes,
];
