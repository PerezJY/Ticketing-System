import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, Navigate,useLocation } from "react-router-dom";
import {
  MdOutlineInventory,
  MdBarChart,
  MdOutlinePointOfSale,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";

const categories = [
  {
    title: "Qtech Inventory Support System",
    icon: <MdOutlineInventory className="text-3xl" />,
    category: "InventorySupport",
  },
  {
    title: "POS for Retail and F&B",
    icon: <MdOutlinePointOfSale className="text-3xl" />,
    category: "PosRetail",
  },
  {
    title: "Qtech Utility Billing System",
    icon: <RiBillLine className="text-3xl" />,
    category: "UtilityBilling",
  },
  {
    title: "QSA (Quick and Simple Accounting)",
    icon: <MdBarChart className="text-3xl" />,
    category: "AccountingSystem",
  },
  {
    title: "Philippine HR, Payroll and Time Keeping System",
    icon: <BsCashCoin className="text-3xl" />,
    category: "HRPayrollSystem",
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
    <div
      className={`mx-5 mt-10 md:mt-3 transition-all duration-300 ${
        activeMenu ? "lg:pl-75" : "lg:pl-25"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#1D4ED8]">Categories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            onClick={() => handleCategoryClick(item.category)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleCategoryClick(item.category);
            }}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex items-center gap-4 min-w-[250px] cursor-pointer hover:shadow-lg transition duration-200"
          >
            <div className="rounded-xl bg-blue-100 p-3">{item.icon}</div>
            <div>
              <div className="text-black font-semibold">{item.title}</div>
              <div className="text-2xl font-extrabold text-black">1000</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
