import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "../../layout/Layout";

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const createdTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - createdTime) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

const Notification = () => {
  const { activeMenu, user, token } = useStateContext();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !user?.id) return;

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
      setNotifications(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token, user]);

  if (!token || !user?.id) {
    return <Navigate to="/" />;
  }

  const handleRowClick = (notif) => {
    navigate(`/admin/notification/${notif.id}`, { state: notif });
  };

    return (
      <Layout>
        <div
          className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
            activeMenu ? "lg:pl-72" : "lg:pl-24"
          }`}
        >
          <div className="text-3xl font-bold text-[#1D4ED8] mb-6">Notifications</div>


          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] space-y-2">
            <div className="grid grid-cols-[repeat(5,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
              <div>Customer</div>
              <div>Ticket ID</div>
            <div>Issue</div>
              <div>Status</div>
              <div>Time</div>
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-500 flex items-center justify-center gap-2">
                <div className="spinner-overlay">
                  <div className="loading-line"></div>
                </div>
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleRowClick(notif)}
                  className="grid grid-cols-[repeat(5,_1fr)] bg-[#EEF0FF] rounded-md text-center text-sm text-gray-700 py-3 px-4 items-center cursor-pointer hover:bg-[#dfe3ff] transition"
                >
                  <div className="truncate">{notif.customer}</div>
                  <div className="truncate">#{notif.id}</div>
                  <div className="truncate">{notif.issue}</div>
                  <div className="font-medium">
                    <span
                      className={`${
                        notif.status === "Resolved"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {notif.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatTimeAgo(notif.created_at)}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 italic">
                No notifications available.
              </div>
            )}
          </div>

          <div className="p-4 flex justify-center border-t border-gray-200 mt-6">
            <button
              onClick={() => alert("See More clicked!")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              See More
            </button>
          </div>
        </div>
      </Layout>
    );
};

export default Notification;
