import React, { useState, useEffect, useMemo } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const TicketDetails = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [assignedAgent, setAssignedAgent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!login && !user) {
    return <Navigate to="/" />;
  }

  // compute display name
  const selectedAgentName = useMemo(() => {
    if (assignedAgent) {
      const a = agents.find(x => String(x.id) === String(assignedAgent));
      if (a) return a.name;
    }
    return ticketData?.agent_name || "Unassigned";
  }, [assignedAgent, agents, ticketData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch ticket
        const res1 = await fetch(`http://localhost:8000/api/ticket/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const t = await res1.json();
        if (!res1.ok) throw new Error(t.message || "Failed to fetch ticket");
        setTicketData(t);
        setAssignedAgent(t.agent_id || "");
      } catch (err) {
        console.error("Error fetching ticket:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  useEffect(() => {
    const fetchAgents = async () => {
      if (!ticketData?.category) return;

      try {
        // Ensure the category is URL-encoded
        const encodedCategory = encodeURIComponent(ticketData.category);
        console.log("Encoded Category:", encodedCategory);
        const res2 = await fetch(`http://localhost:8000/api/agentsByCategory/${encodedCategory}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!res2.ok) {
          throw new Error(`Failed to fetch agents for category: ${ticketData.category}`);
        }

        const { agents: list } = await res2.json();
        if (Array.isArray(list)) {
          setAgents(list);
        } else {
          console.error("Agents response format is incorrect:", list);
        }
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError(err.message || "Failed to load agents.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [ticketData?.category, token]);

  const handleAssign = async () => {
    if (!assignedAgent) {
      alert("Please select an agent");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/api/assignAgent/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent_id: assignedAgent }),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message);
      setTicketData(td => ({ ...td, agent_name: updated.agent_name }));
      alert("Agent assigned successfully!");
    } catch (err) {
      console.error("Error assigning agent:", err);
      alert("Assignment failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center flex justify-center">
        <div className="spinner-overlay">
          <div className="loading-line"></div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (!ticketData) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: Ticket data not available.
      </div>
    );
  }

  return (
    <div
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
        activeMenu ? "lg:pl-75" : "lg:pl-25"
      }`}
    >
      <div className="flex gap-4">
        <IoMdArrowBack
          className="text-4xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="text-3xl font-bold text-[#1D4ED8]">Tickets Details</div>
      </div>

      <div className="mt-10 border border-gray-100 shadow-sm rounded-xl bg-white">
        <div className="px-4 grid grid-cols-12">
          {/* Left column */}
          <div className="col-span-12 md:col-span-5 p-8 text-sm">
            <div className="text-gray-600 font-semibold">Ticket ID</div>
            <div className="text-black font-bold mt-1">{ticketData.id}</div>

            <div className="text-gray-600 font-semibold mt-6">
              Customer Name
            </div>
            <div className="mt-2 text-black font-bold">
              {ticketData.customer_name}
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 md:col-span-7 p-8 text-sm">
            <div className="text-gray-600 font-semibold mt-2">Created Date</div>
            <div className="mt-2 text-black font-bold">
              {ticketData.created_at}
            </div>

            <div className="text-gray-600 font-semibold mt-6">Status</div>
            <div className="text-black font-bold mt-1">{ticketData.status}</div>
          </div>

          {/* Description & timeline */}
          <div className="col-span-12 md:col-span-5 px-8 mt-5 text-sm">
            <div className="text-gray-600 font-semibold">Description</div>
            <div className="mt-2 text-black font-bold">
              {ticketData.ticket_body}
            </div>

            <div className="text-gray-600 font-semibold mt-5">Timeline</div>
            <div className="text-black font-bold mt-1">Initial Response</div>
            <div className="text-black font-bold">March 2, 2025 | 9:02 AM</div>
            <div className="text-black font-bold mt-4">Technical Assigned</div>
            <div className="text-black font-bold">March 2, 2025 | 9:15 AM</div>
          </div>

          {/* Assigned Agent & assignment UI */}
          <div className="col-span-12 md:col-span-7 px-8 mt-5 text-sm">
            <div className="text-gray-600 font-semibold">Assigned Agent</div>
            <div className="text-black font-bold mt-1">{selectedAgentName}</div>

            <div className="mt-5 flex items-center space-x-3">
              <select
                value={assignedAgent}
                onChange={(e) => setAssignedAgent(e.target.value)}
                className="p-2 border-2 border-black rounded-md focus:outline-none"
              >
                <option value="">Select Agent</option>
                {agents.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              <button
                onClick={handleAssign}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
              >
                Assign Agent
              </button>
            </div>
          </div>

          

          {/* Attachments */}
          <div className="col-span-12 md:col-span-7 px-8 mt-5 text-sm">
            <div className="text-gray-600 font-semibold">Attachments</div>
            <div className="text-black font-bold mt-1">{ticketData.image_path}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
