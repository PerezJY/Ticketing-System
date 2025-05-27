import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Layout from "../../layout/Layout";
export const AgentTickets = () => {
  const { activeMenu, user, login,token } = useStateContext();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

if (!login && !user) {
 navigate("/");
}

  useEffect(() => {

  const fetchTickets = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/tickets/agent/${user.id}`, {
        method: "GET",  
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch tickets");
      setTickets(data.tickets || []); // make sure to set the tickets from response
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch tickets");
      setLoading(false);
    }
  };

    fetchTickets();
  }, [login, user, token]);

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
            onClick={() => navigate("/agent/dashboard")}
          />
        </div>
        <div className="text-3xl font-bold text-[#1D4ED8]">
          Tickets
        </div>
      </div>

      <div className="max-w mt-10 p-6 py-10 border border-gray-100 shadow-sm rounded-lg bg-white min-h-[500px]">
        <div className="hidden md:grid grid-cols-[repeat(6,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
          <div>Ticket ID</div>
          <div>Category</div>
          <div>Priority</div>
          <div>Agent</div>
          <div>Date Created</div>
          <div>Status</div>
        </div>

        {loading && <p className="text-center text-sm text-gray-500">Loading tickets...</p>}
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        {!loading && tickets.length === 0 && (
          <p className="text-center text-sm text-gray-500">No tickets found.</p>
        )}

        <div className="space-y-2">
          {tickets.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/agent/tickets/${item.id}`, {
                  state: item,
                })
              }
              className="bg-[#EEF0FF] rounded-md text-sm text-gray-700 py-3 px-4 cursor-pointer hover:bg-[#dfe3ff] transition
                       grid md:grid-cols-[repeat(6,_1fr)] items-center gap-2"
            >
              <div className="hidden md:block truncate text-center">
                {item.id}
              </div>
              <div className="hidden md:block truncate text-center">
                {item.category}
              </div>
              <div className={`hidden md:block truncate text-center ${getPriorityColor(item.priority)}`}>
                {item.priority}
              </div>
              <div className="hidden md:block truncate text-center">
                {item.agent_name}
              </div>
              <div className="hidden md:block truncate text-center">
                {item.created_at}
              </div>
              <div className="hidden md:block truncate text-center">
                <span className={statusColor(item.status)}>
                  {item.status}
                </span>
              </div>

              <div className="md:hidden space-y-1">
                <div><span className="font-semibold">Ticket ID:</span> {item.id}</div>
                <div><span className="font-semibold">Category:</span> {item.category}</div>
                <div><span className="font-semibold">Priority:</span> <span className={getPriorityColor(item.priority)}>{item.priority}</span></div>
                <div><span className="font-semibold">Agent:</span> {item.agent_name}</div>
                <div><span className="font-semibold">Date:</span> {item.created_at}</div>
                <div><span className="font-semibold">Status:</span> <span className={statusColor(item.status)}>{item.status}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default AgentTickets;
