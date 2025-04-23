import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";

const CustomerNotification = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !user?.id) {
      return <Navigate to="/" />; // Redirect if no token
    }

    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/notif", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json(); // Parse the response data
        console.log(data); // Log the response to verify its structure

        // Set the fetched data to notifications state
        setNotifications(data); // Assuming the response returns an array of tickets
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
   

    fetchTickets();
  }, [token]);

  const handleRowClick = (notif) => {
    navigate(`/customer/tickets/notificationDetails/${notif.id}`, {
      state: notif,
    });
  };

  return (
    <div
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
        activeMenu ? "lg:pl-75" : "lg:pl-24"
      }`}
    >
      <div className="text-3xl font-bold text-[#1D4ED8] mb-6">Notification</div>
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] space-y-2">
        {/* Header */}
        <div className="grid grid-cols-[repeat(4,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
          <div>Ticket ID</div>
          <div>Category</div>
          <div>Issue</div>
          <div>Status</div>
        </div>

        {/* Rows */}
        {notifications.length > 0 ? (
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
                    notif.status === "Resolved" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {notif.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerNotification;
