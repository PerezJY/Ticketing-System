import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerDashboard from "../Pages/customers/CustomerDasboard";
import CustomerNotification from "../Pages/customers/CustomerNotification";
import CustomerNotifTicketDetails from "../Pages/customers/CustomerNotifTicketDetails";
import Createticket from "../Pages/customers/Createticket";
import Layout from "../components/Layout";
const CustomerRoutes = () => {
  return (
    <Routes>
      <Route
        path="/customer/dashboard"
        element={
          <Layout>
            {" "}
            <CustomerDashboard />
          </Layout>
        }
      />
      <Route
        path="/customer/dashboard"
        element={
          <Layout>
            {" "}
            <CustomerDashboard />
          </Layout>
        }
      />
      <Route
        path="/customer/notification"
        element={
          <Layout>
            <CustomerNotification />{" "}
          </Layout>
        }
      />
      <Route
        path="/customer/notification/:id"
        element={
          <Layout>
            {" "}
            <CustomerNotifTicketDetails />{" "}
          </Layout>
        }
      />
      <Route
        path="/customer/create-ticket"
        element={
          <Layout>
            <Createticket />{" "}
          </Layout>
        }
      />

      <Route path="/termsAndConditions" element={<TermsAndConditions />} />
    </Routes>
  );
};

export default CustomerRoutes;
