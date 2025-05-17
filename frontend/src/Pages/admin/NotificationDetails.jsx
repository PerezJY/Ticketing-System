import React, { useState, useEffect, useMemo } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const NotificationDetails = () => {
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
      return <div className="text-center mt-10">Loading...</div>;
    }
    if (error) {
      return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
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
export default NotificationDetails;
