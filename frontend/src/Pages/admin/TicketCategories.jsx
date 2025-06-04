import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Layout from "../../layout/Layout";
import POS from "../../assets/point-of-sale.png";
import Inventory from "../../assets/inventory.png";
import Utility from "../../assets/utility.png";
import QSA from "../../assets/accounting.png";
import HR from "../../assets/hr.png";

const categories = [
  {
    title: "POS for Retail and F&B",
    icon: (
      <img
        src={POS}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "POSRetail",
    description: "Log POS errors, outages, and inquiries.",
    bgColor: "	bg-sky-300",
    textColor: "text-yellow-600",
  },

  {
    title: " Inventory Support System",
    icon: (
      <img
        src={Inventory}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "InventorySupport",
    description: "Track stock-related issues and requests.",
    bgColor: "bg-green-300",
    textColor: "text-indigo-600",
  },

  {
    title: "Utility Billing System",
    icon: (
      <img
        src={Utility}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "UtilityBilling",
    description: "Billing disputes and system issues.",
    bgColor: "bg-orange-200",
    textColor: "text-sky-600",
  },
  {
    title: "QSA (Quick and Simple Accounting)",
    icon: (
      <img
        src={QSA}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "AccountingSystem",
    description: "Tickets for accounting system concerns.",
    bgColor: "bg-red-200",
    textColor: "text-emerald-600",
  },

  {
    title: "Philippine HR, Payroll and Time Keeping System",
    icon: (
      <img
        src={HR}
        alt="POS Icon"
        className="max-w-full w-35 h-auto object-contain hover:scale-110 transition-all duration-300"
      />
    ),
    category: "HRPayrollSystem",
    description: "HR, payroll, and attendance issues.",
    bgColor: "bg-yellow-200",
    textColor: "text-rose-600",
  },
];


export const TicketCategories = () => {
  const { activeMenu, user, login } = useStateContext();
  const navigate = useNavigate();
 
  if (!login && !user) {
    return <Navigate to="/" />;
  }

  const handleCategoryClick = (category) => {
    navigate(`/admin/ticketCategories/${category}`);
  };

  return (
    <Layout>
     <div className={`transition-all ${activeMenu ? "lg:pl-72" : "lg:pl-23"}`}>
        <div className="container px-8 py-6">
          <div className="text-3xl font-bold text-[#1D4ED8] mb-1">
            Ticket Categories
          </div>
          <div className="text-sm font-semibold text-gray-500">
            Manage tickets by category
          </div>

       <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg cursor-pointer "
                onClick={() => handleCategoryClick(item.category)}
              >
                <div className={`py-5 ${item.bgColor} rounded-t-2xl px-5`}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center mb-4 rounded-full  text-2xl`}
                    >
                      {item.icon}
                    </div>
                  </div>
                </div>
                <div className="px-9 py-8">
                  <h3 className="text-2xl text-gray-800 font-bold mb-3">
                    {item.title}
                  </h3>
                  <h3 className="text-sm text-gray-600 font-medium  mb-2">
                    {item.description}
                  </h3>
                  <div className="mt-5 flex justify-start">
                    <div
               className="text-blue-600 font-semibold hover:underline text-md lg:text-md flex items-center cursor-pointer group transition-all duration-400"
                      onClick={() => handleCategoryClick(item.category)}
                    >
                      <span>View Tickets</span>
                      <FaArrowRight className="ml-2 transform -rotate-45 transition duration-400 group-hover:rotate-0" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
