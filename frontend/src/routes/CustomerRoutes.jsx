import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerDashboard from "../Pages/customers/CustomerDasboard";
import CustomerNotification from "../pages/customers/CustomerNotification";
import CustomerNotifTicketDetails from "../Pages/customers/CustomerNotifTicketDetails";
import Createticket from "../Pages/customers/Createticket";
import Layout from "../components/Layout";
const CustomerRoutes = () => {
  return (
    <Routes>
      <Route
        path="/customer"
        element={
          <Layout>
            <CustomerDashboard />
          </Layout>
        }
      />
      <Route
        path="/customer/notification"
        element={
          <Layout>
            <CustomerNotification />
          </Layout>
        }
      />
      <Route
        path="/customer/tickets/notificationDetails/:id"
        element={
          <Layout>
            <CustomerNotifTicketDetails />
          </Layout>
        }
      />
      <Route
        path="/customer/create-ticket"
        element={
          <Layout>
            <Createticket />
          </Layout>
        }
      />
    </Routes>
  );
};

export default CustomerRoutes;
