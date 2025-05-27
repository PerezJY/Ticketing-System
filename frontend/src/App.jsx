import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Dashboard } from "./Pages/admin/Dashboard";
import Agent from "./Pages/admin/Agent";
import Notification from "./Pages/admin/Notification";
import NotificationDetails from "./Pages/admin/NotificationDetails";
import TicketDetails from "./Pages/admin/TicketDetails";
import {InventorySupport} from "./Pages/admin/InventorySupport";
import { Profile } from "./Pages/admin/Profile";
import { TicketCategories } from "./Pages/admin/TicketCategories";
import { PosRetail } from "./Pages/admin/PosRetail";


import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/Forgotpass";
import Otp from "./Pages/Otp";
import About from "./Pages/About";

import AgentDashboard from "./Pages/agent/AgentDashboard";
import AgentTicketdetails from "./Pages/agent/AgentTicketdetails";
import AgentNotification from "./Pages/agent/AgentNotification";
import AgentNotifTicketDetails from "./Pages/agent/AgentNotifTicketDetails";
import { AgentTickets } from "./Pages/agent/Tickets";
import Agentstatus from "./Pages/agent/Agentstatus";
import AgentReply from "./Pages/agent/AgentReply";

import CustomerDashboard from "./Pages/customers/CustomerDasboard";
import CustomerTicket from "./Pages/customers/CustomerTicket";
import CustomerNotification from "./Pages/customers/CustomerNotification";
import CustomerNotifTicketDetails from "./Pages/customers/CustomerNotifTicketDetails";
import Createticket from "./Pages/customers/Createticket";

import GuestLayout from "./layout/GuestLayout";
import DefaultLayout from "./layout/DefaultLayout";
import AdminLayout from "./layout/AdminLayout";
import AgentLayout from "./layout/AgentLayout";
import Layout from "./layout/Layout";
import UserLayout from "./layout/UserLayout";

import { Toaster } from "react-hot-toast";
import { HRPayrollSystem } from "./Pages/admin/HRPayrollSystem";
import { UtilityBilling } from "./Pages/admin/UtilityBilling";
import { AccountingSystem } from "./Pages/admin/AccountingSystem";

function AppRoutes() {
  const location = useLocation();
  const noLayoutRoutes = ["/", "/signup"];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <Routes>
      {/* Guest Routes */}
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Standalone Public Pages */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/Otp" element={<Otp />} />
      <Route path="/about" element={<About />} />

      {/* Customer Routes */}
      <Route path="/customer" element={<DefaultLayout />}>
        <Route path="dashboard" element={<UserLayout><CustomerDashboard /></UserLayout>} />
        <Route path="tickets" element={<UserLayout><CustomerTicket /></UserLayout>} />
        <Route path="notification" element={<UserLayout><CustomerNotification /></UserLayout>} />
        <Route path="tickets/notificationDetails/:id" element={<UserLayout><CustomerNotifTicketDetails /></UserLayout>} />
        <Route path="create-ticket" element={<UserLayout><Createticket /></UserLayout>} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="agent" element={<Layout><Toaster position="top-right" /><Agent /></Layout>} />
        <Route path="notification" element={<Layout><Notification /></Layout>} />
        <Route path="notification/:id" element={<Layout><NotificationDetails /></Layout>} />
        <Route path="ticketCategories" element={<Layout><TicketCategories /></Layout>} />
        <Route path="details/:id" element={<Layout><TicketDetails /></Layout>} />
        <Route path="profile" element={<Layout><Profile /></Layout>} />
        <Route path="ticketCategories/PosRetail" element={<Layout><PosRetail/></Layout>} />
        <Route path="ticketCategories/InventorySupport" element={<Layout><InventorySupport/></Layout>} />
        <Route path="ticketCategories/HRPayrollSystem" element={<Layout><HRPayrollSystem/></Layout>} />
        <Route path="ticketCategories/UtilityBilling" element={<Layout><UtilityBilling/></Layout>} />
        <Route path="ticketCategories/AccountingSystem" element={<Layout><AccountingSystem/></Layout>} />
      </Route>

      {/* Agent Routes */}
      <Route path="/agent" element={<AgentLayout />}>
        <Route path="dashboard" element={<Layout><AgentDashboard /></Layout>} />
        <Route path="notification" element={<Layout><AgentNotification /></Layout>} />
        <Route path="notification/:id" element={<Layout><AgentNotifTicketDetails /></Layout>} />
        <Route path="tickets" element={<Layout><AgentTickets /></Layout>} />
        <Route path="tickets/:id" element={<Layout><Agentstatus/></Layout>} />
        <Route path="reply" element={<Layout><AgentReply /></Layout>} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
