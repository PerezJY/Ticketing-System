import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";

const CustomerNotification = () => {
  const { user, token } = useStateContext();
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  console.log("Token:", token);
  console.log("User:", user);

  if (token === undefined || user === undefined) {
    return null; // or a spinner if you want
  }

  if (!token || !user?.id) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const mockData = Array.from({ length: 15 }, (_, i) => {
      const statusOptions = ["Open", "Resolved", "Pending"];
      const now = new Date();

      return {
        id: i + 1,
        user_name: `User ${i + 1}`,
        user_email: `user${i + 1}@example.com`,
        ticket_body: `Sample ticket message ${i + 1}`,
        status: statusOptions[i % statusOptions.length],
        created_at: new Date(now - i * 60 * 60 * 1000).toISOString(),
      };
    });

    setNotifications(mockData);
  }, [token, user]);

  const handleRowClick = (notif) => {
    navigate(`/customer/tickets/notificationDetails/${notif.id}`, {
      state: notif,
    });
  };

  const handleSeeMore = () => {
    alert("See More clicked!");
  };

  const TableWrapper = ({ children }) => {
    if (notifications.length > 10) {
      return <div className="max-h-[500px] overflow-y-auto">{children}</div>;
    }
    return <>{children}</>;
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((new Date() - new Date(timestamp)) / 60000); // minutes
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min${diff > 1 ? "s" : ""} ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="mx-5 md:mx-10 lg:mx-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-3xl font-bold text-[#1D4ED8] mb-6">Notifications</div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <TableWrapper>
              <table className="min-w-full text-sm text-gray-700">
                <thead className="uppercase text-gray-500 bg-white">
                  <tr>
                    <th className="px-6 py-4 text-center">User</th>
                    <th className="px-6 py-4 text-center">Ticket No</th>
                    <th className="px-6 py-4 text-center">Message</th>
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
                          <div className="font-medium text-gray-900">{notif.user_name}</div>
                        </td>
                        <td className="px-6 py-4 text-center">#{notif.id}</td>
                        <td className="px-6 py-4 text-center truncate max-w-xs" title={notif.ticket_body}>
                          {notif.ticket_body}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`${
                              notif.status === "Resolved"
                                ? "text-green-600"
                                : "text-red-500"
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
            </TableWrapper>
          </div>

          <div className="p-4 flex justify-center border-t border-gray-200">
            <button
              onClick={handleSeeMore}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerNotification;
