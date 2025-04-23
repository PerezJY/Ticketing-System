import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export const Tickets = () => {
  const { activeMenu,user,login} = useStateContext();
  const navigate = useNavigate();

  
  // Redirect if not logged in
  if(!login && !user){
    return <Navigate to ='/'/>
  }

  // dummy data
  const data = [
    {
      id: 112381389173,
      category: "POS for Retail and F&B",
      priority: "High",
      agent: "John Doe",
      date: "March 1, 2025",
      status: "Unresolved",
      customer: "Customer Name",
      description: "Payment terminal not processing transactions",
    },
    {
      id: 2918392821,
      date: "March 1, 2025",
      category: "POS for Retail and F&B",
      priority: "Primary",
      agent: "John Doe",
      status: "Resolved",
      customer: "Pangalan ng nag - ticket",
      description: "Payment terminal not processing transactions",
    },
  ];

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
      mx-5 md:mx-5 lg:mx-5
      transition-all duration-300 
      ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
    `}
    >
      <div className="flex gap-4">
        <div>
          <IoMdArrowBack
            className="text-4xl cursor-pointer"
            onClick={() => navigate("/admin/ticketCategories")}
          />
        </div>
        <div className="text-3xl font-bold text-[#1D4ED8]">
          POS for Retail and F&B
        </div>
      </div>
      <div className="max-w mt-10 p-6 py-10 border border-gray-100 shadow-sm rounded-lg bg-white min-h-[500px] ">
        <div className="space-y-2">
          <div className="grid grid-cols-[repeat(6,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
            <div>Ticket ID</div>
            <div>Category</div>
            <div>Priority</div>
            <div>Agent</div>
            <div>Date Created</div>
            <div>Status</div>
          </div>

          {data.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/admin/tickets/ticketDetails/${item.id}`, {
                  state: item,
                })
              }
              className="grid grid-cols-[repeat(6,_1fr)] bg-[#EEF0FF] rounded-md text-center text-sm text-gray-700 py-3 px-4 items-center cursor-pointer hover:bg-[#dfe3ff] transition"
            >
              <div className="truncate">{item.id}</div>
              <div className="truncate">{item.category}</div>
              <div className={`truncate ${getPriorityColor(item.priority)}`}>
                {item.priority}
              </div>
              <div className="truncate">{item.agent}</div>
              <div className="truncate">{item.date}</div>
              <div className="truncate">
                <span className={`truncate ${statusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
