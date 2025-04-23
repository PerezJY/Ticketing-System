import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/admin/Dashboard";
import Agent from "./pages/admin/Agent";
import Notification from "./Pages/admin/Notification";
import NotificationDetails from "./Pages/admin/NotificationDetails";
import { TicketDetails } from "./pages/admin/TicketDetails";
import { Tickets } from "./pages/admin/Tickets";
import { Profile } from "./pages/admin/Profile";
import { TicketCategories } from "./pages/admin/TicketCategories";

import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";


import AgentDashboard from "./Pages/agent/AgentdashDoard";
import AgentNotification from "./pages/agent/AgentNotification";
import AgentNotifTicketDetails from "./Pages/agent/AgentNotifTicketDetails";
import AgentTicket from "./Pages/agent/Tickets";

import CustomerDashboard from "./Pages/customers/CustomerDasboard";
import CustomerNotification from "./Pages/customers/CustomerNotification";
import CustomerNotifTicketDetails from "./Pages/customers/CustomerNotifTicketDetails";
import Createticket from "./Pages/customers/Createticket";
import GuetsLayout from "./layout/GuetsLayout";
import DefaultLayout from "./layout/DefaultLayou";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <div className="mt-20 md:mt-28 p-4">{children}</div>
      </div>
    </div>
  );
};

function AppRoutes() {
  const location = useLocation();
  const noLayoutRoutes = ["/", "/signup"];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (

    
    <Routes>

      <Route path='/' element ={<GuetsLayout/>}>

            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

      </Route>


      <Route path='/' element = {<DefaultLayout/>}>

      <Route path="/admin"element={<Layout><Dashboard /></Layout>}/>
      <Route path="/admin/agent" element={<Layout><Agent /></Layout>}/>
      <Route path="/admin/notification"element={<Layout><Notification /></Layout>}/>
      <Route path="/admin/NotificationDetails" element={<Layout><NotificationDetails /></Layout>}/>
      <Route path="/admin/ticketCategories" element={ <Layout> <TicketCategories /> </Layout> } />
      <Route path="/admin/tickets" element={ <Layout> <Tickets /> </Layout>}/>
      <Route path="/admin/tickets/ticketDetails" element={ <Layout> <TicketDetails /> </Layout> } />
      <Route path="/admin/profile" element={ <Layout> <Profile /> </Layout>  }/>

    
      <Route path="/agent" element={ <Layout> <AgentDashboard /> </Layout>}/>
      <Route path="/agent/notification" element={ <Layout>  <AgentNotification /> </Layout> }/>
      <Route path="/agent/tickets/notificationDetails" element={ <Layout><AgentNotifTicketDetails /> </Layout>} />
      <Route path="/agent/tikets" element={ <Layout> <AgentTicket /></Layout> } />
      <Route path="/agent/TicketDetails"element={<Layout><TicketDetails/> </Layout>}/> 
      
   
      <Route path="/customer" element={<Layout> <CustomerDashboard /></Layout> } />
      <Route path="/customer/dashboard" element={<Layout> <CustomerDashboard /></Layout> } />
      <Route path="/customer/notification" element={ <Layout><CustomerNotification /> </Layout> }/>
      <Route path="/customer/tickets/notificationDetails/:id"element={<Layout> <CustomerNotifTicketDetails /> </Layout> }/>
      <Route path="/customer/create-ticket" element={ <Layout><Createticket /> </Layout> } /> 
      </Route>
     </Routes>
      
  );
}

function App() {
  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
}

export default App;
