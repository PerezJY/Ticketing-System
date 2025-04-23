import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const CustomerNotifTicketDetails = () => {
  const { activeMenu, user, token } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams(); // Get ticket ID from the URL
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not logged in
  if (!user?.id) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/ticket/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch ticket");
        }

        setTicketData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error: {error}</div>;

  return (
    <div
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
        activeMenu ? "lg:pl-75" : "lg:pl-25"
      }`}
    >
      <div className="flex gap-4">
        <div>
          <IoMdArrowBack
            className="text-4xl cursor-pointer"
            onClick={() => navigate("/customer/notification")}
          />
        </div>
        <div className="text-3xl font-bold text-[#1D4ED8]">Ticket Details</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] space-y-2 mt-6">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-5 p-4 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-2">Ticket ID</div>
              <div className="mt-2 text-black font-bold">{ticketData.id}</div>

              <div className="text-gray-600 font-semibold mt-6">Customer Name</div>
              <div className="mt-2 text-black font-bold">{ticketData.customer_name}</div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 p-4 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-2">Created Date</div>
              <div className="mt-2 text-black font-bold">{ticketData.created_at}</div>

              <div className="text-gray-600 font-semibold mt-6">Status</div>
              <div className="mt-2 text-black font-bold">{ticketData.status}</div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 mt-5 px-4 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold">Description</div>
              <div className="mt-2 text-black font-bold">{ticketData.ticket_body}</div>

              <div className="text-gray-600 font-semibold mt-5 md:mt-8">Timeline</div>
              <div className="mt-2 text-black font-bold">Initial Response</div>
              <div className="mt-2 text-black font-bold">March 2, 2025 | 9:02 AM</div>
              <div className="mt-4 text-black font-bold">Technician Assigned</div>
              <div className="mt-2 text-black font-bold">March 2, 2025 | 9:15 AM</div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 px-4 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-5 md:mt-25">Assigned Agent</div>
              <div className="mt-2 text-black font-bold">{ticketData.agent_name}</div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 px-4 mt-5 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-5 md:mt-15">Attachments</div>
              <div className="mt-2 text-black font-bold mb-10">{ticketData.image_path}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerNotifTicketDetails;
