import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Layout from "../../layout/Layout";
const AgentNotifTicketDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketData = location.state;
  const { activeMenu, user, login } = useStateContext();

  // Redirect if not logged in
  if (!login && !user) {
    return <Navigate to="/" />;
  }

  if (!ticketData) {
    return (
      <div
        className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
          activeMenu ? "lg:pl-75" : "lg:pl-25"
        }`}
      >
        <div className="text-red-500">Error: Ticket data not available.</div>
      </div>
    );
  }

  {/* CHANGES */}
  return (
    
      <div
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
        activeMenu ? "lg:pl-75" : "lg:pl-25"
      }`}
    > 
      <div className="flex gap-4 items-center">
        <IoMdArrowBack
          className="text-4xl cursor-pointer"
          onClick={() => navigate("/agent/notification")}
        />
        <div className="text-3xl font-bold text-[#1D4ED8]">
          Ticket ID: {ticketData.ticketNumber}
        </div>
      </div>
  
      <div className="bg-white rounded-md p-6 min-h-[500px] mt-6 text-sm text-black">
        {/* First Section */}
        <div className="grid grid-cols-12 gap-y-6">
          {/* Left */}
          <div className="col-span-12 md:col-span-6 px-4">
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">Status:</div>
              <div className="mt-1 font-bold">{ticketData.status}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">Priority:</div>
              <div className="mt-1 font-bold">{ticketData.priority}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">Category:</div>
              <div className="mt-1 font-bold">{ticketData.department}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">Create Date:</div>
              <div className="mt-1 font-bold">{ticketData.date}</div>
            </div>
          </div>
  
          {/* Right */}
          <div className="col-span-12 md:col-span-6 px-4">
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">User Name:</div>
              <div className="mt-1 font-bold">{ticketData.customer}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">Email:</div>
              <div className="mt-1 font-bold">{ticketData.email}</div>
            </div>
          </div>
        </div>
  
        <div className="border-t border-gray-300 my-6" />
  
        {/* Second Section */}
        <div className="grid grid-cols-12 gap-y-6">
          <div className="col-span-12 md:col-span-6 px-4">
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">Assigned To:</div>
              <div className="mt-1 font-bold">{ticketData.agent}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">Due Date:</div>
              <div className="mt-1 font-bold">{ticketData.dueDate}</div>
            </div>
          </div>
  
          <div className="col-span-12 md:col-span-6 px-4">
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">Help Topic (Category):</div>
              <div className="mt-1 font-bold">{ticketData.helpTopic}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-600 font-semibold">Last Response:</div>
              <div className="mt-1 font-bold">{ticketData.lastResponse}</div>
            </div>
          </div>
        </div>
  
        {/* Concern Message */}
        <div className="border-t border-gray-300 my-6" />
        <div className="px-4">
          <div className="text-gray-600 font-semibold mb-2">Message:</div>
          <div className="font-medium text-[15px] leading-relaxed">
            {ticketData.lastMessage}
          </div>
        </div>
  
        {/* Attachment Section */}
        <div className="px-4 mt-6">
          <div className="text-gray-600 font-semibold mb-2">Attachment:</div>
          {/* This should map over any attachments if there are multiple */}
          <div className="text-blue-600 underline cursor-pointer">
            {ticketData.attachment || "No attachment available"}
          </div>
        </div>
      </div>
    </div>
    
  );
  
  
};

export default AgentNotifTicketDetails;
