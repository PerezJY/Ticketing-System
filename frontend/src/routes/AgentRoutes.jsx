import { Route, Routes } from "react-router-dom";
import { Tickets as AgentTickets } from "../pages/agent/Tickets";
import AgentDashboard from "../Pages/agent/AgentDashboard";
import AgentNotification from "../pages/agent/AgentNotification";
import AgentNotifTicketDetails from "../Pages/agent/AgentNotifTicketDetails";
import AgentTicketdetails from "../pages/agent/AgentTicketdetails";
import Layout from "../components/Layout";
const AgentRoutes = () => {
  return (
    <Routes>
      <Route
        path="/agent"
        element={
          <Layout>
            <AgentDashboard />
          </Layout>
        }
      />
      <Route
        path="/agent/notification"
        element={
          <Layout>
            <AgentNotification />
          </Layout>
        }
      />

      <Route
        path="/agent/Tickets"
        element={
          <Layout>
            <AgentTickets />
          </Layout>
        }
      />

      <Route
        path="/agent/tickets/notificationDetails/:id"
        element={
          <Layout>
            <AgentNotifTicketDetails />
          </Layout>
        }
      />

      <Route
        path="/agent/AgentTicketdetails"
        element={
          <Layout>
            <AgentTicketdetails />
          </Layout>
        }
      />

      <Route
        path="agent/AgentTicketdetails/:id"
        element={
          <Layout>
            <AgentTicketdetails />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AgentRoutes;
