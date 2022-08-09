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

// Guards
import AuthGuard from "../components/AuthGuard";

// Auth components
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Components components
import Accordion from "../pages/components/Accordion";
import Alerts from "../pages/components/Alerts";
import Avatars from "../pages/components/Avatars";
import Badges from "../pages/components/Badges";
import Buttons from "../pages/components/Buttons";
import Cards from "../pages/components/Cards";
import Chips from "../pages/components/Chips";
import Dialogs from "../pages/components/Dialogs";
import Lists from "../pages/components/Lists";
import Menus from "../pages/components/Menus";
import Pagination from "../pages/components/Pagination";
import Progress from "../pages/components/Progress";
import Snackbars from "../pages/components/Snackbars";
import Tooltips from "../pages/components/Tooltips";

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const SaaS = async(() => import("../pages/dashboards/SaaS"));

// Forms components
import SelectionCtrls from "../pages/forms/SelectionControls";
import Selects from "../pages/forms/Selects";
import TextFields from "../pages/forms/TextFields";
const Pickers = async(() => import("../pages/forms/Pickers"));
const Dropzone = async(() => import("../pages/forms/Dropzone"));
const Editors = async(() => import("../pages/forms/Editors"));
const Formik = async(() => import("../pages/forms/Formik"));

// Icons components
import MaterialIcons from "../pages/icons/MaterialIcons";
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
import Blank from "../pages/pages/Blank";
import InvoiceDetails from "../pages/pages/InvoiceDetails";
import InvoiceList from "../pages/pages/InvoiceList";
import Orders from "../pages/pages/Orders";
import Pricing from "../pages/pages/Pricing";
import Settings from "../pages/pages/Settings";
import Projects from "../pages/pages/Projects";
import Chat from "../pages/pages/Chat";
const Profile = async(() => import("../pages/pages/Profile"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Calendar = async(() => import("../pages/pages/Calendar"));

// Tables components
import SimpleTable from "../pages/tables/SimpleTable";
import AdvancedTable from "../pages/tables/AdvancedTable";

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
import Welcome from "../pages/docs/Welcome";
import GettingStarted from "../pages/docs/GettingStarted";
import EnvironmentVariables from "../pages/docs/EnvironmentVariables";
import Deployment from "../pages/docs/Deployment";
import Theming from "../pages/docs/Theming";
import StateManagement from "../pages/docs/StateManagement";
import APICalls from "../pages/docs/APICalls";
import ESLintAndPrettier from "../pages/docs/ESLintAndPrettier";
import Support from "../pages/docs/Support";
import Changelog from "../pages/docs/Changelog";

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
  id: "Analytics",
  path: "/analytics",
  icon: <Briefcase />,
  component: Analytics,
  children: null,
};

const orderRoutes = {
  id: "Orders",
  path: "/orders",
  icon: <ShoppingCart />,
  component: Orders,
  children: null,
};

const authRoutes = {
  id: "Form",
  path: "/form",
  icon: <Users />,
  children: null,
  component: TextFields,
};

const componentsRoutes = {
  id: "Tables",
  path: "/tables",
  icon: <Grid />,
  children: [
    {
      path: "/simpleTables",
      name: "Simple Tables",
      component: SimpleTable,
    },
  ],
  component: null,
};

const chartRoutes = {
  id: "Settings",
  path: "/charts",
  icon: <PieChart />,
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

  authRoutes,
  componentsRoutes,
  chartRoutes,
];
