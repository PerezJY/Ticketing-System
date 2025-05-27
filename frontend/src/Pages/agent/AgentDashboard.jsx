import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineInventory,
  MdBarChart,
  MdOutlinePointOfSale,
} from "react-icons/md";
import { IoBuildOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { 
  MdOutlinePendingActions,
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlineOpenInNew
} from "react-icons/md";
import categoryImage from "../../assets/categoryImage.png";
import Layout from "../../layout/Layout";

export const AgentDashboard = () => {
  const { activeMenu } = useStateContext();
  const navigate = useNavigate();

  return (
    
      <div className={`bg-gray-100 min-h-screen transition-all duration-300 ${activeMenu ? 'ml-70' : 'ml-0'}`}>
        <div className="container mx-auto px-8 py-6">
          <h1 className="text-2xl font-bold mb-6">Agent Dashboard</h1>

          {/* Status Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white shadow-md rounded-lg p-6 hover:bg-blue-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-700">Open</h2>
                <MdOutlineOpenInNew className="text-2xl text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 hover:bg-yellow-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
                <MdOutlinePendingActions className="text-2xl text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">5</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 hover:bg-green-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-700">Resolved</h2>
                <MdOutlineCheckCircle className="text-2xl text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">21</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-700">Closed</h2>
                <MdOutlineCancel className="text-2xl text-gray-600" />
              </div>
              <p className="text-3xl font-bold text-gray-600">8</p>
            </div>
          </div>

          {/* Ticket List */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Tickets</h2>
            <div className="space-y-4">
              {/* Ticket Item */}
              <div className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">#1001 Cannot access account</h3>
                    <p className="text-sm text-gray-600">Requestor: John Smith</p>
                    <p className="text-sm text-gray-600">Priority: High</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors">
                    Open
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">#1002 Error message on checkout</h3>
                    <p className="text-sm text-gray-600">Requestor: Jane Doe</p>
                    <p className="text-sm text-gray-600">Priority: Medium</p>
                  </div>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-4 py-2 transition-colors">
                    Pending
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">#1003 Website not loading</h3>
                    <p className="text-sm text-gray-600">Requestor: Michael Brown</p>
                    <p className="text-sm text-gray-600">Priority: High</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors">
                    Open
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">#1004 Issue with payment processing</h3>
                    <p className="text-sm text-gray-600">Requestor: Emily Johnson</p>
                    <p className="text-sm text-gray-600">Priority: Low</p>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition-colors">
                    Resolved
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">#1005 Feature request: Dark mode</h3>
                    <p className="text-sm text-gray-600">Requestor: Sarah Wilson</p>
                    <p className="text-sm text-gray-600">Priority: Low</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors">
                    Open
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default AgentDashboard;
