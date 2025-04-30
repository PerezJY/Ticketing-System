import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export const TicketDetails = () => {
  const { activeMenu, user, login } = useStateContext();

  const navigate = useNavigate();
  const location = useLocation();
  const ticketData = location.state;

  // Redirect if not logged in
  if (!login && !user) {
    return <navigate to="/" />;
  }
  if (!ticketData) {
    return (
      <div
        className={`
        mx-5 md:mx-5 lg:mx-5
        transition-all duration-300 
        ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
      `}
      >
        <div className="text-red-500">Error: Ticket data not available.</div>
      </div>
    );
  }

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
            onClick={() => navigate("/admin/tickets")}
          />
        </div>
        <div className="text-3xl font-bold text-[#1D4ED8]">Tickets Details</div>
      </div>
      <div className="max-w mt-10 border border-gray-100 shadow-sm rounded-xl bg-white">
        <div className="px-4 grid grid-cols-12 ">
          <div className="col-span-12 md:col-span-5 p-8 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-2">Ticket ID</div>
              <div className="mt-2 text-black font-bold">{ticketData.id}</div>

              <div className="text-gray-600 font-semibold mt-6">
                Customer Name
              </div>
              <div className="mt-2 text-black font-bold">
                {ticketData.customer}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 p-8 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-2">
                Created Date
              </div>
              <div className="mt-2 text-black font-bold">{ticketData.date}</div>

              <div className="text-gray-600 font-semibold mt-6">Status</div>
              <div className="mt-2 text-black font-bold">
                {ticketData.status}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 mt-5 px-8 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold ">Description</div>
              <div className="mt-2 text-black font-bold">
                {ticketData.description}
              </div>

              <div className="text-gray-600 font-semibold mt-5 md:mt-8">
                Timeline
              </div>
              <div className="mt-2 text-black font-bold">Initial Response</div>
              <div className="mt-2 text-black font-bold">
                March 2, 2025 | 9:02 AM
              </div>
              <div className="mt-4 text-black font-bold ">
                Technicial Assigned
              </div>
              <div className="mt-2 text-black font-bold">
                March 2, 2025 | 9:15 AM
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 px-8 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-5 md:mt-25">
                Assigned Agent
              </div>
              <div className="mt-2 text-black font-bold">
                {ticketData.agent}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 px-8 mt-5 text-sm">
            <div className="block">
              <div className="text-gray-600 font-semibold mt-5 md:mt-15">
                Attachments
              </div>
              <div className="mt-2 text-black font-bold mb-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
