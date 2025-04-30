import { Route, Routes } from "react-router-dom";
import { Tickets as AgentTickets } from "../pages/agent/Tickets";
import AgentDashboard from "../pages/agent/AgentDashboard";
import AgentNotification from "../pages/agent/AgentNotification";
import AgentNotifTicketDetails from "../Pages/agent/AgentNotifTicketDetails";
import AgentTicketdetails from "../pages/agent/AgentTicketdetails";
import Layout from "../components/Layout";
const AgentRoutes = () => {
  return (
    <Routes>
      <Route
        path="/agent/dashboard"
        element={
          <Layout>
            {" "}
            <AgentDashboard />{" "}
          </Layout>
        }
      />
      <Route
        path="/agent/notification"
        element={
          <Layout>
            {" "}
            <AgentNotification />{" "}
          </Layout>
        }
      />
      <Route
        path="/agent/notification/:id"
        element={
          <Layout>
            <AgentNotifTicketDetails />{" "}
          </Layout>
        }
      />
      <Route
        path="/agent/tickets"
        element={
          <Layout>
            {" "}
            <AgentTickets />
          </Layout>
        }
      />
      <Route
        path="/agent/tickets/:id"
        element={
          <Layout>
            <TicketDetails />{" "}
          </Layout>
        }
      />
    </Routes>
  );
};

export default AgentRoutes;
