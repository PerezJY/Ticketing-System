import React, { useEffect, useState, useCallback } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { getNotificationDescription } from "../../utils/NotificationUtils"; // <-- new import

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const createdTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - createdTime) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

const getStatusClass = (status) => {
  switch (status) {
    case "Resolved":
      return "text-green-600 font-semibold";
    case "In Progress":
      return "text-yellow-600 font-semibold";
    case "Closed":
      return "text-gray-500 font-semibold";
    case "Open":
    case "Opened":
      return "text-blue-600 font-semibold";
    default:
      return "text-red-600 font-semibold";
  }
};

const AgentNotification = () => {
  const { activeMenu, user, token } = useStateContext();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !user?.id) return;

    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/api/tickets/agent/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch tickets: ${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token, user]);

  if (!token || !user?.id) {
    return <Navigate to="/" replace />;
  }

  const handleRowClick = useCallback(
    (notif) => {
      navigate(`/agent/notification/${ticket.id}`, { state: notif });
    },
    [navigate]
  );

  return (
    <Layout>
      <div className={`transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}>
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-[#1D4ED8] mb-6">Notifications</h1>

          <div className="bg-white rounded-md shadow p-6 min-h-[400px] space-y-2">
            <div className="grid grid-cols-[repeat(5,_1fr)] text-center font-semibold text-gray-600 text-sm py-2 border-b border-gray-200">
              <div>Customer</div>
              <div>Ticket ID</div>
              <div>Message</div>
              <div>Status</div>
              <div>Time</div>
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-500 flex items-center justify-center gap-3">
                <svg
                  className="animate-spin h-8 w-8 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Loading Notifications...</span>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => {
                const description = getNotificationDescription(notif, "agent", user.id);
                if (!description) return null;

                return (
                  <div
                    key={notif.id}
                    onClick={() => handleRowClick(notif)}
                    className="grid grid-cols-[repeat(5,_1fr)] bg-[#EEF0FF] rounded-md text-center text-sm text-gray-700 py-3 px-4 items-center cursor-pointer hover:bg-[#dfe3ff] transition"
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleRowClick(notif);
                    }}
                  >
                    <div className="truncate">{ticket.customer_name || "N/A"}</div>
                    <div className="truncate">#{user.id}</div>
                    <div className="truncate">{description}</div>
                    <div className={getStatusClass(ticket.status)}>{ticket.status}</div>
                    <div className="text-xs text-gray-400">{formatTimeAgo(ticket.created_at)}</div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-gray-500 italic">No notifications available.</div>
            )}
          </div>

          <div className="p-4 flex justify-center border-t border-gray-200 mt-6">
            <button
              onClick={() => alert("See More clicked!")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              aria-label="See more notifications"
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentNotification;
