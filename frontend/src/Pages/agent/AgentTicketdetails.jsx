import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Layout from "../../layout/Layout";

const AgentTicketdetails = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/ticket/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch ticket");
        setTicketData(data);
        setStatus(data.status || "Open");
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);

  const handleStatusUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/tickets/${id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Status update failed");

      setTicketData((prev) => ({ ...prev, status }));
      alert("Status updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (!login && !user) {
    navigate("/");
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-20 text-lg font-medium text-gray-500">
          Loading ticket details...
        </div>
      </Layout>
    );
  }

  if (error || !ticketData) {
    return (
      <Layout>
        <div
          className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
            activeMenu ? "lg:pl-75" : "lg:pl-25"
          }`}
        >
          <div className="text-red-500">Error: {error || "Data not available."}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${
          activeMenu ? "lg:pl-75" : "lg:pl-25"
        }`}
      >
        <div className="flex gap-4 items-center mt-5">
          <IoMdArrowBack
            className="text-4xl cursor-pointer"
            onClick={() => navigate("/agent/tickets")}
          />
          <div className="text-3xl font-bold text-[#1D4ED8]">
            Ticket ID: {ticketData.ticketNumber}
          </div>
        </div>

        <div className="bg-white rounded-md p-6 min-h-[500px] mt-6 text-sm text-black">
          <div className="grid grid-cols-12 gap-y-6">
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

          <div className="border-t border-gray-300 my-6" />

          <div className="px-4">
            <div className="text-gray-600 font-semibold mb-2">Message:</div>
            <div className="font-medium text-[15px] leading-relaxed">
              {ticketData.lastMessage}
            </div>
          </div>

          <div className="px-4 mt-6">
            <div className="text-gray-600 font-semibold mb-2">Attachment:</div>
            <div className="text-blue-600 underline cursor-pointer">
              {ticketData.image_path || "No attachment available"}
            </div>
          </div>

          <div className="border-t border-gray-300 my-6" />

          <div className="px-4 text-sm">
            <div className="text-3xl font-bold text-[#1D4ED8] mb-6">Ticket Details</div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6">
                <div className="font-semibold text-gray-600 mt-2">Ticket ID</div>
                <div className="text-black font-bold">{ticketData.id}</div>

                <div className="font-semibold text-gray-600 mt-6">Customer Name</div>
                <div className="text-black font-bold">{ticketData.customer_name}</div>

                <div className="font-semibold text-gray-600 mt-6">Description</div>
                <div className="text-black font-bold">{ticketData.ticket_body}</div>

                <div className="font-semibold text-gray-600 mt-6">Timeline</div>
                <div className="text-black font-bold mt-2">Initial Response</div>
                <div className="text-black font-bold">March 2, 2025 | 9:02 AM</div>
                <div className="text-black font-bold mt-4">Technician Assigned</div>
                <div className="text-black font-bold">March 2, 2025 | 9:15 AM</div>
              </div>

              <div className="col-span-12 md:col-span-6">
                <div className="font-semibold text-gray-600 mt-2">Created Date</div>
                <div className="text-black font-bold">{ticketData.created_at}</div>

                <div className="font-semibold text-gray-600 mt-6">Status</div>
                <div className="flex items-center gap-2 mt-1">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="p-2 border-2 border-black rounded-md"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
                  >
                    Update
                  </button>
                </div>

                <div className="font-semibold text-gray-600 mt-6">Priority</div>
                <div className="text-black font-bold mt-1">{ticketData.priority}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentTicketdetails;