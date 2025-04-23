import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/admin/Dashboard";
import Agent from "../pages/admin/Agent";
import Notification from "../Pages/admin/Notification";
import NotificationDetails from "../Pages/admin/NotificationDetails";
import TicketDetails from "../pages/admin/TicketDetails";
import { Tickets } from "../pages/admin/Tickets";
import { Profile } from "../pages/admin/Profile";
import { TicketCategories } from "../pages/admin/TicketCategories";
import Layout from "../components/Layout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
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
        path="/admin/NotificationDetails/:id"
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
            <TicketCategories />
          </Layout>
        }
      />

      <Route
        path="/admin/tickets"
        element={
          <Layout>
            <Tickets />
          </Layout>
        }
      />
      <Route
        path="admin/tickets/ticketDetails/:id"
        element={
          <Layout>
            <TicketDetails />
          </Layout>
        }
      />

      <Route
        path="/admin/TicketDetails"
        element={
          <Layout>
            <TicketDetails />
          </Layout>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
