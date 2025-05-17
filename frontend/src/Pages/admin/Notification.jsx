import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "../../layout/Layout";

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
        console.log(data); // Optional: For debugging
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
    navigate(`/admin/notification/${notif.id}`, {
      state: notif,
    });
  };

  {/* CHANGES */}
  return (
<<<<<<< HEAD
    <div
      className={`mx-5 transition-all duration-300 ${
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
        </div>

        <div className="p-4 flex justify-center border-t border-gray-200">
          <button
            onClick={() => alert("See More clicked!")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            See More
          </button>
        </div>
=======
    <Layout>
      <div
        className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
          activeMenu ? "lg:pl-72" : "lg:pl-24"
        }`}
      >
        <div className="text-3xl font-bold text-[#1D4ED8] mb-6">
          Notification
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] space-y-2">
          <div className="grid grid-cols-[repeat(4,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
            <div>Ticket ID</div>
            <div>Category</div>
            <div>Issue</div>
            <div>Status</div>
          </div>
          {loading ? (
            <div className="p-6 text-center text-gray-500 flex items-center justify-center gap-2">
              <div className="spinner-overlay">
                <div className="loading-line"></div>
              </div>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <div
                key={index}
                onClick={() => handleRowClick(notif)}
                className="grid grid-cols-[repeat(4,_1fr)] bg-[#EEF0FF] rounded-md text-center text-sm text-gray-700 py-3 px-4 items-center cursor-pointer hover:bg-[#dfe3ff] transition"
              >
                <div className="truncate">{notif.id}</div>
                <div className="truncate">{notif.category}</div>
                <div className="truncate">{notif.ticket_body}</div>
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
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No notifications found
            </div>
          )}
        </div>
>>>>>>> 0cf3919e2cfbe177bc3d0b746db45529ea502227
      </div>
    </Layout>
  );
};

export default Notification;
