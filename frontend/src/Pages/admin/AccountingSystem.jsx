import { useStateContext } from "../../contexts/ContextProvider";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect, useState, useMemo } from "react";

export const AccountingSystem = () => {
  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState([]);
  const [agents, setAgents] = useState([]);
  const [assigning, setAssigning] = useState(false);

  const { activeMenu, user, login, token, currentCategory, setCurrentCategory } = useStateContext();

  const location = useLocation();
  const navigate = useNavigate();
  const { category: routeCategory } = location.state || {};

  const selectedCategory = routeCategory || currentCategory;

  // Redirect if not logged in
  if (!login && !user?.id) {
    return <Navigate to="/" />;
  }

   useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);

      // Fetch tickets
      const ticketsRes = await fetch(`http://localhost:8000/api/qsa`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!ticketsRes.ok) throw new Error("Failed to fetch tickets");

      // Fetch agents
      const agentsRes = await fetch("http://localhost:8000/api/agents", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Parse JSON
      const tickets = await ticketsRes.json();
      const agentsData = await agentsRes.json();

      // Set state
      setTicketData(tickets);
      setAgents(Array.isArray(agentsData.agents) ? agentsData.agents : []);
    } catch (err) {
      console.error(err);
      setAgents([]); // Probably you meant to clear agents here
    } finally {
      setLoading(false);
    }
  }

  fetchData(); // Corrected function call
}, [token]);


  const handleAssignAgent = async (ticketId, agentId) => {
    if (!agentId) return;
    setAssigning(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/assignAgent/${ticketId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ agent_id: agentId }),
        }
      );

      const updated = await response.json();
      if (!response.ok) throw new Error(updated.message);

      setTicketData((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId
            ? { ...ticket, agent_name: updated.agent_name, agent_id: agentId }
            : ticket
        )
      );
    } catch (err) {
      console.error("Agent assignment failed:", err);
      alert("Failed to assign agent");
    } finally {
      setAssigning(false);
    }
  };

  const filteredAgents = useMemo(() => {
    return agents.filter(
      (agent) =>
        agent.category?.trim().toLowerCase() ===
        selectedCategory?.trim().toLowerCase()
    );
  }, [agents, selectedCategory]);

  const getPriorityColor = (priority) => {
    const colors = {
      High: "text-red-500",
      Primary: "text-green-500",
      Medium: "text-yellow-500",
      Low: "text-gray-500",
    };
    return `${colors[priority] || "text-black"} font-semibold`;
  };

  const statusColor = (status) => {
    const colors = {
      Unresolved: "text-red-500",
      pending: "text-orange-500",
      Resolved: "text-green-500",
    };
    return `${colors[status] || "text-black"} font-semibold`;
  };

  return (
    <div className={`mx-5 transition-all duration-300 ${activeMenu ? "lg:pl-75" : "lg:pl-25"}`}>
      <div className="flex gap-4 items-center">
        <IoMdArrowBack
          className="text-4xl cursor-pointer"
          onClick={() => navigate("/admin/ticketCategories")}
        />
        <div className="text-3xl font-bold text-[#1D4ED8]">QSA (Quick and Simple Accounting)</div>
      </div>

      <div className="mt-10 p-6 py-10 border border-gray-100 shadow-sm rounded-lg bg-white min-h-[500px]">
        <div className="hidden md:grid grid-cols-[repeat(6,_1fr)] items-center text-center font-semibold text-gray-600 text-sm py-2 mb-5">
          <div>Ticket ID</div>
          <div>Category</div>
          <div>Priority</div>
          <div>Agent</div>
          <div>Date Created</div>
          <div>Status</div>
        </div>

        <div className="space-y-2">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="spinner-overlay">
                <div className="loading-line"></div>
              </div>
            </div>
          ) : ticketData.length > 0 ? (
            ticketData.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() =>
                  navigate(`/admin/details/${ticket.id}`, {
                    state: ticket,
                  })
                }
                className="bg-[#EEF0FF] rounded-md text-sm text-gray-700 py-3 px-4 cursor-pointer hover:bg-[#dfe3ff] transition grid md:grid-cols-[repeat(6,_1fr)] items-center gap-2"
              >
                <div className="hidden md:block truncate">{ticket.id}</div>
                <div className="hidden md:block truncate">{ticket.category}</div>
                <div className={`hidden md:block truncate ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </div>
                <div className="hidden md:block truncate">{ticket.agent_name || "Unassigned"}</div>
                <div className="hidden md:block truncate">{ticket.created_at}</div>
                <div className={`hidden md:block truncate ${statusColor(ticket.status)}`}>
                  {ticket.status}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No tickets found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
