import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "../../layout/Layout";

const AgentNotification = () => {
  const { user, login, activeMenu } = useStateContext();
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  if (!login || !user?.id) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const mockData = [
      {
        id: "TICK-1001",
        category: "POS for Retail and F&B",
        issue:
          "Customer unable to complete transaction using QRIS on mobile POS. Error code 504 appears.",
        status: "Unresolved",
        customer: "John Doe",
        created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
      },
      {
        id: "TICK-1002",
        category: "qSA (Quick Accounting)",
        issue:
          "Accounting summary page not loading for fiscal year 2023. Blank screen after login.",
        status: "Resolved",
        customer: "Jane Smith",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      },
      {
        id: "TICK-1003",
        category: "POS for Retail and F&B",
        issue:
          "Discount calculation on combined orders is incorrect, not reflecting in customer receipt.",
        status: "Pending",
        customer: "David Lee",
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      },
      {
        id: "TICK-1004",
        category: "qSA (Quick Accounting)",
        issue:
          "Cannot export sales reports to PDF, export button is greyed out despite proper permissions.",
        status: "Unresolved",
        customer: "Maria Garcia",
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      },
      {
        id: "TICK-1005",
        category: "POS for Retail and F&B",
        issue:
          "Inventory syncing delays between central server and branch POS terminals.",
        status: "Resolved",
        customer: "Ahmad Yusuf",
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      },
    ];

    setNotifications(mockData);
  }, [user]);

  const handleRowClick = (notif) => {
    navigate(`/agent/notification/${notif.id}`, {
      state: notif,
    });
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((new Date() - new Date(timestamp)) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min${diff > 1 ? "s" : ""} ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    
      <div
        className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
          activeMenu ? "lg:pl-75" : "lg:pl-24"
        }`}
      >
        <div className="text-3xl font-bold text-[#1D4ED8] mb-6">Notifications</div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 table-auto">
              <thead className="uppercase text-gray-500 bg-white">
                <tr>
                  <th className="px-6 py-4 text-center">Customer</th>
                  <th className="px-6 py-4 text-center">Ticket ID</th>
                  <th className="px-6 py-4 text-center">Issue</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Time</th>
                </tr>
              </thead>
              <tbody>
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(notif)}
                      className="bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="flex items-center gap-3 px-6 py-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={40}
                          height={40}
                          viewBox="0 0 16 16"
                          className="text-gray-500 flex-shrink-0"
                        >
                          <path
                            fill="currentColor"
                            d="M11 7c0 1.66-1.34 3-3 3S5 8.66 5 7s1.34-3 3-3s3 1.34 3 3"
                          />
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M16 8c0 4.42-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8M4 13.75C4.16 13.484 5.71 11 7.99 11c2.27 0 3.83 2.49 3.99 2.75A6.98 6.98 0 0 0 14.99 8c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 2.38 1.19 4.49 3.01 5.75"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="font-medium text-gray-900">{notif.customer}</div>
                      </td>
                      <td className="px-6 py-4 text-center">#{notif.id}</td>
                      <td className="px-6 py-4 text-center whitespace-normal break-words">
                        {notif.issue}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`${
                            notif.status === "Resolved" ? "text-green-600" : "text-red-500"
                          } font-medium`}
                        >
                          {notif.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400 text-center">
                        {formatTimeAgo(notif.created_at)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                      No notifications available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-center border-t border-gray-200">
            <button
              onClick={() => alert("See More clicked!")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              See More
            </button>
          </div>
        </div>
      </div>
  );
};

export default AgentNotification;
