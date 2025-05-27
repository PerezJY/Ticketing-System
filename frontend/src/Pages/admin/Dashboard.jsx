import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { FiTag } from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";
import Layout from "../../layout/Layout";

export const Dashboard = () => {
  const { activeMenu, user, login, token } = useStateContext(); // assuming token is stored in context
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  // Redirect if not logged in
  if (!login && !user?.id) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/allTickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        console.log(data); // Optional: For debugging
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [token]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500 font-semibold";
      case "Primary":
        return "text-green-500 font-semibold";
      case "Medium":
        return "text-yellow-500 font-semibold";
      case "Low":
        return "text-gray-500 font-semibold";
      default:
        return "text-black";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Unresolved":
        return "text-red-500 font-semibold";
      case "Resolved":
        return "text-green-500 font-semibold";
      default:
        return "text-black";
    }
  };

  return (
    
      <div
        className={`
mx-5 md:mx-5 mt-10 md:mt-3 lg:mx-5
transition-all duration-300 
${activeMenu ? "lg:pl-75" : "lg:pl-25"}
`}
      >
        <div className="text-3xl font-bold text-[#1D4ED8]">Dashboard </div>

        {/* Summary Cards */}
        <div className="max-w mt-7 p-7 border border-gray-100 shadow-sm rounded-xl bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Unresolved Tickets */}
            <div
              className="p-6 py-7 gap-4 rounded-xl flex items-center space-x-4 border border-gray-100 shadow-md bg-white
           cursor-pointer hover:text-blue-700 transition-all duration-300"
            >
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600 text-4xl">
                <FiTag />
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Unresolved Tickets
                </h3>
                <h1 className="text-3xl font-extrabold">100</h1>
              </div>
            </div>

            {/* Resolved Tickets */}
            <div
              className="p-6 py-7 gap-4 rounded-xl flex items-center space-x-4 border border-gray-100 shadow-md bg-white
           cursor-pointer hover:text-blue-700 transition-all duration-300"
            >
              <div className="bg-green-100 p-3 rounded-xl text-green-500 text-4xl">
                <FaTicketAlt />
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Resolved Tickets</h3>
                <h1 className="text-3xl font-extrabold">13, 490</h1>
              </div>
            </div>

            {/* Urgent Tickets */}
            <div
              className="p-6 py-7 gap-4 rounded-xl flex items-center space-x-4 border border-gray-100 shadow-md bg-white 
          cursor-pointer hover:text-blue-700 transition-all duration-300"
            >
              <div className="bg-red-100 p-3 rounded-xl text-red-500 text-4xl ">
                <MdConfirmationNumber />
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Urgent Tickets</h3>
                <h1 className="text-3xl font-extrabold">3, 671</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket List */}
        <div className="max-w mt-10 p-6 py-10 border border-gray-100 shadow-sm rounded-lg bg-white min-h-[330px]">
          <div className="mb-5 font-semibold">Recent Tickets</div>
          <div className="hidden md:grid grid-cols-[repeat(6,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
            <div>Ticket ID</div>
            <div>Category</div>
            <div>Priority</div>
            <div>Agent</div>
            <div>Date Created</div>
            <div>Status</div>
          </div>

          <div className="space-y-2">
            {tickets.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  navigate(`/admin/tickets/${item.id}`, {
                    state: item,
                  })
                }
                className="bg-[#EEF0FF] rounded-md text-sm text-gray-700 py-3 px-4 cursor-pointer hover:bg-[#dfe3ff] transition grid md:grid-cols-[repeat(6,_1fr)] items-center gap-2"
              >
                <div className="hidden md:block truncate text-center">
                  {item.id}
                </div>
                <div className="hidden md:block truncate text-center">
                  {item.category}
                </div>
                <div
                  className={`hidden md:block truncate text-center ${getPriorityColor(
                    item.priority
                  )}`}
                >
                  {item.priority}
                </div>
                <div className="hidden md:block truncate text-center">
                  {item.agent_name}
                </div>
                <div className="hidden md:block truncate text-center">
                  {item.created_at}
                </div>
                <div className="hidden md:block truncate text-center">
                  <span className={`truncate ${statusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-1">
                  <div>
                    <span className="font-semibold">Ticket ID:</span> {item.id}
                  </div>
                  <div>
                    <span className="font-semibold">Category:</span>{" "}
                    {item.category}
                  </div>
                  <div>
                    <span className="font-semibold">Priority:</span>{" "}
                    <span className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Agent:</span>{" "}
                    {item.agent_name}
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span>{" "}
                    {item.created_at}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={statusColor(item.status)}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    
  );
};
