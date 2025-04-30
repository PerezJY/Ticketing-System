import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Pages/admin/Dashboard";
import Agent from "../Pages/admin/Agent";
import Notification from "../Pages/admin/Notification";
import NotificationDetails from "../Pages/admin/NotificationDetails";
import TicketDetails from "../Pages/admin/TicketDetails";
import Tickets from "../pages/agent/Tickets";
import { Profile } from "../Pages/admin/Profile";
import { TicketCategories } from "../Pages/admin/TicketCategories";
import Layout from "../components/Layout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/admin/agent"
        element={
          <Layout>
            <Agent />
          </Layout>
        }
      />
      <Route
        path="/admin/notification"
        element={
          <Layout>
            <Notification />
          </Layout>
        }
      />
      <Route
        path="/admin/notification/:id"
        element={
          <Layout>
            <NotificationDetails />
          </Layout>
        }
      />
      <Route
        path="/admin/ticketCategories"
        element={
          <Layout>
            {" "}
            <TicketCategories />{" "}
          </Layout>
        }
      />
      <Route
        path="/admin/tickets"
        element={
          <Layout>
            {" "}
            <Tickets />{" "}
          </Layout>
        }
      />
      <Route
        path="/admin/tickets/:id"
        element={
          <Layout>
            {" "}
            <TicketDetails />{" "}
          </Layout>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <Layout>
            {" "}
            <Profile />{" "}
          </Layout>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
