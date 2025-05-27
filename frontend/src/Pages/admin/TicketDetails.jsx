import React, { useState, useEffect, useMemo } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Layout from "../../layout/Layout";
const TicketDetails = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [assignedAgent, setAssignedAgent] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not logged in
  if (!login && !user?.id) {
    return <Navigate to="/" />;
  }

  const selectedAgentName = useMemo(() => {
    if (assignedAgent) {
      const agent = agents.find((a) => String(a.id) === String(assignedAgent));
      return agent?.name || "Unassigned";
    }
    return ticketData?.agent_name || "Unassigned";
  }, [assignedAgent, agents, ticketData]);

  // Fetch Ticket Details
  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/ticket/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch ticket");
        setTicketData(data);
        setAssignedAgent(data.agent_id || "");
        setPriority(data.priority || "Low");
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);

  // Fetch Agents by Category
  useEffect(() => {
    const fetchAgents = async () => {
      if (!ticketData?.category) return;
      try {
        const encodedCategory = encodeURIComponent(ticketData.category);
        const res = await fetch(
          `http://localhost:8000/api/agentsByCategory/${encodedCategory}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch agents");
        if (Array.isArray(data.agents)) setAgents(data.agents);
        else throw new Error("Invalid agents format");
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchAgents();
  }, [ticketData?.category, token]);

  // Assign Agent to Ticket
  const handleAssign = async () => {
    if (!assignedAgent) return alert("Please select an agent");

    try {
      const res = await fetch(`http://localhost:8000/api/assignAgent/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent_id: assignedAgent }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Assignment failed");

      setTicketData((prev) => ({
        ...prev,
        agent_id: assignedAgent,
        agent_name: data.agent_name,
      }));

      alert("Agent assigned successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to assign agent");
    }
  };

  // Update Ticket Status
  const handlePriorityUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/tickets/${id}/priority`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priority }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "priority update failed");

      setTicketData((prev) => ({ ...prev, priority }));
      alert("Priority updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update priority");
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
        Ticket data not available.
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
        <div className="text-3xl font-bold text-[#1D4ED8]">Ticket Details</div>
      </div>

      <div className="mt-10 border border-gray-100 shadow-sm rounded-xl bg-white">
        <div className="px-4 grid grid-cols-12">
          {/* Left Column */}
          <div className="col-span-12 md:col-span-5 p-8 text-sm">
            <div className="font-semibold text-gray-600">Ticket ID</div>
            <div className="font-bold text-black mt-1">{ticketData.id}</div>

            <div className="font-semibold text-gray-600 mt-6">
              Customer Name
            </div>
            <div className="font-bold text-black mt-1">
              {ticketData.customer_name}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 md:col-span-7 p-8 text-sm">
            <div className="font-semibold text-gray-600">Created Date</div>
            <div className="font-bold text-black mt-1">
              {ticketData.created_at}
            </div>

             <div className="font-semibold text-gray-600 mt-6">Status</div>
            <div className="font-bold text-black mt-1">
                          {ticketData.status}
                        </div>
            <div className="font-semibold text-gray-600 mt-6">Priority</div>
            
            <div className="flex items-center gap-2 mt-1">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-2 border-2 border-black rounded-md"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
              <button
                onClick={handlePriorityUpdate}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
              >
                Update
              </button>
            </div>
          </div>

          {/* Description & Timeline */}
          <div className="col-span-12 md:col-span-5 px-8 mt-5 text-sm">
            <div className="font-semibold text-gray-600">Description</div>
            <div className="font-bold text-black mt-2">
              {ticketData.ticket_body}
            </div>

            <div className="font-semibold text-gray-600 mt-5">Timeline</div>
            <div className="font-bold text-black mt-1">Initial Response</div>
            <div className="font-bold text-black">March 2, 2025 | 9:02 AM</div>
            <div className="font-bold text-black mt-4">Technical Assigned</div>
            <div className="font-bold text-black">March 2, 2025 | 9:15 AM</div>
          </div>

          {/* Agent Assignment */}
          <div className="col-span-12 md:col-span-7 px-8 mt-5 text-sm">
            <div className="font-semibold text-gray-600">Assigned Agent</div>
            <div className="font-bold text-black mt-1">{selectedAgentName}</div>

            <div className="flex items-center gap-3 mt-3">
              <select
                value={assignedAgent}
                onChange={(e) => setAssignedAgent(e.target.value)}
                className="p-2 border-2 border-black rounded-md"
              >
                <option value="">Select Agent</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAssign}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
              >
                Assign Agent
              </button>
            </div>
          </div>

          {/* Attachments */}
          <div className="col-span-12 md:col-span-7 px-8 mt-5 text-sm">
            <div className="font-semibold text-gray-600">Attachments</div>
            <div className="font-bold text-black mt-1">
              {ticketData.image_path || "No attachment provided"}
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default TicketDetails;
