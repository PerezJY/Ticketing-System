import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import DateTime from "../../components/DateTime";
import {
  MdOutlinePendingActions,
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlineOpenInNew,
  MdCalendarToday,
  MdOutlineAccessTime,
} from "react-icons/md";

import Image from "../../assets/dashboard-img.png";

export const Dashboard = () => {
  const { activeMenu, user, login, token,contextReady } = useStateContext(); // assuming token is stored in context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [closedCount, setCloseCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("agentsCurrentPage");
    return savedPage ? parseInt(savedPage) : 1;
  });
  const itemsPerPage = 7;

  useEffect(() => {
    localStorage.setItem("agentsCurrentPage", currentPage);
  }, [currentPage]);
  useEffect(() => {
    return () => {
      localStorage.removeItem("agentsCurrentPage");
    };
  }, []);

  // Redirect if not logged in
  if (!login && !user?.id) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
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
        setTickets(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);


  useEffect(() => {
    const fetchCount = async () => {
      if (!contextReady || !login || !user?.id || !token) return;
      try {
        const [res, res1, res2,res3] = await Promise.all([
        
          fetch(`http://localhost:8000/api/tickets/open-count`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch(`http://localhost:8000/api/tickets/pending-count`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch(`http://localhost:8000/api/tickets/resolved-count`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),

           fetch(`http://localhost:8000/api/tickets/closed-count`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);
       
        const [data, data1, data2,data3] = await Promise.all([
          res.json(),
          res1.json(),
          res2.json(),
          res3.json()
      
        ]);
  
        if (!res.ok) throw new Error(data.message || "Failed to fetch open tickets");
        if (!res1.ok) throw new Error(data1.message || "Failed to fetch pending tickets");
        if (!res2.ok) throw new Error(data2.message || "Failed to fetch resolved tickets");
        if (!res3.ok) throw new Error(data3.message || "Failed to fetch close tickets");
  
        setOpenCount(data);
        setPendingCount(data1)
        setResolvedCount(data2);
        setCloseCount(data3);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch ticket counts");
        setLoading(false);
      }
    };
  
    fetchCount();
  }, [contextReady, login, user, token]);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase().trim()) {
      case "high":
        return "text-red-500 font-semibold";
      case "primary":
        return "text-green-500 font-semibold";
      case "medium":
        return "text-yellow-500 font-semibold";
      case "low":
        return "text-gray-500 font-semibold";
      default:
        return "text-black";
    }
  };

  const statusColor = (status) => {
    switch (status?.toLowerCase().trim()) {
      case "unresolved":
        return "text-red-500 font-semibold";
      case "pending":
        return "text-orange-500 font-semibold";
      case "resolved":
        return "text-green-500 font-semibold";
      default:
        return "text-black";
    }
  };

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const maxVisiblePages = 2;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Make sure we don't have less than maxVisiblePages if possible
  const adjustedStartPage = Math.max(
    1,
    Math.min(startPage, totalPages - maxVisiblePages + 1)
  );
  const visiblePages = [];
  for (
    let i = adjustedStartPage;
    i <= Math.min(adjustedStartPage + maxVisiblePages - 1, totalPages);
    i++
  ) {
    visiblePages.push(i);
  }

  return (
    <Layout>
      <div className={`transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}>
        <div className="container px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 lg:gap-0 mb-0">
            {/* Right on lg, but top on smaller */}
            <div className="flex justify-center lg:justify-end gap-3 mb-2 lg:mb-0 order-1 lg:order-2 w-full lg:w-auto">
              <div className="bg-white shadow-sm py-2 px-4 rounded-md flex items-center space-x-2">
                <MdCalendarToday className="text-gray-600 text-lg" />
                <DateTime showDate={true} showTime={false} />
              </div>
              <div className="bg-white shadow-sm py-2 px-4 rounded-md flex items-center space-x-2">
                <MdOutlineAccessTime className="text-gray-600 text-xl" />
                <DateTime showDate={false} showTime={true} />
              </div>
            </div>

            {/* Left on lg, but below on smaller */}
            <div className="text-center lg:text-left order-2 lg:order-1 w-full lg:w-auto">
              <div className="text-3xl font-bold text-[#1D4ED8]">Dashboard</div>
              <div className="text-sm font-semibold text-gray-500">
                Your Control Center
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="max-w mt-5">
            <div className="text-md font-semibold text-gray-500 mb-2">
              Overview
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
              <div className="bg-white shadow-md rounded-lg p-6 hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-700">Open</h2>
                  <MdOutlineOpenInNew className="text-2xl text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-600">{openCount?.open_tickets_count ?? 0}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Pending
                  </h2>
                  <MdOutlinePendingActions className="text-2xl text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount?.pending_tickets_count?? 0}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 hover:bg-green-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Resolved
                  </h2>
                  <MdOutlineCheckCircle className="text-2xl text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-600">{resolvedCount?.resolved_tickets_count ?? 0}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Closed
                  </h2>
                  <MdOutlineCancel className="text-2xl text-gray-600" />
                </div>
                <p className="text-3xl font-bold text-gray-600">{closedCount?.closed_tickets_count ?? 0}</p>
              </div>
            </div>
          </div>

          {/* Ticket List */}
          <div className="max-w mt-5 p-8 bg-white shadow-sm rounded-md min-h-[440px]">
            <div className="mb-3 text-md font-semibold text-gray-500">
              Recent Tickets
            </div>
            <div className="hidden md:grid grid-cols-[repeat(6,_1fr)] items-center text-center font-semibold text-gray-600 text-sm py-2 mb-2">
              <div>Ticket ID</div>
              <div>Category</div>
              <div>Priority</div>
              <div>Agent</div>
              <div>Date Created</div>
              <div>Status</div>
            </div>
            <div className="space-y-2">
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
                  <span>Loading Tickets...</span>
                </div>
              ) : filteredData.length > 0 ? (
                currentRows.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() =>
                      navigate(`/admin/details/${ticket.id}`, {
                        state: ticket,
                      })
                    }
                    className="bg-[#EEF0FF] rounded-md text-sm text-gray-700 py-3 px-4 cursor-pointer hover:bg-[#dfe3ff] 
                transition grid md:grid-cols-[repeat(6,_1fr)] items-center gap-2"
                  >
                    <div className="hidden md:block truncate text-center">
                      {ticket.id}
                    </div>
                    <div className="hidden md:block truncate text-center">
                      {ticket.category}
                    </div>
                    <div
                      className={`hidden md:block truncate text-center ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </div>
                    <div className="hidden md:block truncate text-center">
                      {ticket.agent_name}
                    </div>
                    <div className="hidden md:block truncate text-center">
                      {ticket.updated_at}
                    </div>
                    <div className="hidden md:block truncate text-center">
                      <span
                        className={`truncate ${statusColor(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-1">
                      <div>
                        <span className="font-semibold">Ticket ID:</span>{" "}
                        {ticket.id}
                      </div>
                      <div>
                        <span className="font-semibold">Category:</span>{" "}
                        {ticket.category}
                      </div>
                      <div>
                        <span className="font-semibold">Priority:</span>{" "}
                        <span className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Agent:</span>{" "}
                        {ticket.agent_name}
                      </div>
                      <div>
                        <span className="font-semibold">Date:</span>{" "}
                        {ticket.updated_at}
                      </div>
                      <div>
                        <span className="font-semibold">Status:</span>{" "}
                        <span className={statusColor(ticket.status)}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No tickets found
                </div>
              )}
            </div>
          </div>
          {filteredData.length >= 3 && (
            <div className="flex justify-end gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setCurrentPage((prev) => prev - 1);
                    setLoading(false);
                  }, 500); // simulate delay or wait for fetch to finish
                }}
                className={`px-3 py-1 rounded-sm text-sm ${
                  currentPage === 1
                    ? "bg-white border border-0.5 border-gray-200 cursor-not-allowed"
                    : "bg-white border border-0.5 border-gray-200 hover:bg-gray-50  cursor-pointer"
                }`}
              >
                Previous
              </button>

              {visiblePages.map((page) => (
                <button
                  key={page}
                  disabled={currentPage}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-sm text-sm ${
                    page === currentPage
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-white"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setCurrentPage((prev) => prev + 1);
                    setLoading(false);
                  }, 500);
                }}
                className={`px-3 py-1 rounded-sm text-sm ${
                  currentPage === totalPages
                    ? "bg-white border border-0.5 border-gray-200 cursor-not-allowed"
                    : "bg-white border border-0.5 border-gray-200 hover:bg-gray-50  cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
