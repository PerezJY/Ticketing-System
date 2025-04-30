
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect } from "react";
import { useState } from "react";

export const Tickets = () => {
  const { activeMenu, user, login,token } = useStateContext();
   const [ticketData, setTicketData] = useState(null);
   const { id } = useParams();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!token && !user?.id) {
    return <Navigate to="/" />; // Redirect if no token
  }


  useEffect(() => {

    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/pos", {
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
        setTicketData(data); // Assuming the response returns an array of tickets
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
   

    fetchTickets();
  }, [token]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500 font-semibold";
      case "Primary":
        return "text-green-500 font-semibold";
      case "Medium":
        return "text-yellow-500 font-semibold";
      case "Low":
        return "text-gray-500 font-semibold";
      default:
        return "text-black";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Unresolved":
        return "text-red-500 font-semibold";
      case "Resolved":
        return "text-green-500 font-semibold";
      default:
        return "text-black";
    }
  };

  return (
    <div
      className={`
      mx-5 md:mx-5 lg:mx-5
      transition-all duration-300 
      ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
    `}
    >
      <div className="flex gap-4">
        <div>
          <IoMdArrowBack
            className="text-4xl cursor-pointer"
            onClick={() => navigate("/admin/ticketCategories")}
          />
        </div>
        <div className="text-3xl font-bold text-[#1D4ED8]">
          POS for Retail and F&B
        </div>
      </div>
      <div className="max-w mt-10 p-6 py-10 border border-gray-100 shadow-sm rounded-lg bg-white min-h-[500px]">
        <div className="hidden md:grid grid-cols-[repeat(6,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
          <div>Ticket ID</div>
          <div>Category</div>
          <div>Priority</div>
          <div>Agent</div>
          <div>Date Created</div>
          <div>Status</div>
        </div>

        <div className="space-y-2">
          {ticketData?.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/admin/tickets/${item.id}`, {
                  state: item,
                })
              }
              className="bg-[#EEF0FF] rounded-md text-sm text-gray-700 py-3 px-4 cursor-pointer hover:bg-[#dfe3ff] transition
                   grid md:grid-cols-[repeat(6,_1fr)] items-center gap-2"
            >
              <div className="hidden md:block truncate text-center">
                {item.id}
              </div>
              <div className="hidden md:block truncate text-center">
                {item.category}
              </div>
              <div
                className={`hidden md:block truncate text-center ${getPriorityColor(
                  item.priority
                )}`}
              >
                {item.priority}
              </div>
              <div className="hidden md:block truncate text-center">
                {item.agent}
              </div>
              <div className="hidden md:block truncate text-center">
                {item.date}
              </div>
              <div className="hidden md:block truncate text-center">
                <span className={`truncate ${statusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="md:hidden space-y-1">
                <div>
                  <span className="font-semibold">Ticket ID:</span> {item.id}
                </div>
                <div>
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category}
                </div>
                <div>
                  <span className="font-semibold">Priority:</span>{" "}
                  <span className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Agent:</span> {item.agent}
                </div>
                <div>
                  <span className="font-semibold">Date:</span> {item.date}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={statusColor(item.status)}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
