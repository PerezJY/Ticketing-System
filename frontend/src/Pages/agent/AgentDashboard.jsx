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
import categoryImage from "../../assets/categoryImage.png";

export const AgentDashboard = () => {
  const { activeMenu } = useStateContext();
  const navigate = useNavigate();
  return (
    <div
      className={`
    mx-5 md:mx-5 lg:mx-5
    transition-all duration-300 
    ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
  `}
    >
      <div className="text-3xl font-bold text-[#1D4ED8]">Agent Dashboard</div>
      <div className="mt-5 p-4 border border-gray-100 shadow-sm rounded-xl bg-white">
        <div className="mt-5 px-5 xl:px-30">
          <div className="flex flex-col md:flex-row gap-10 w-full justify-between">
            <div className="w-full md:w-1/2 max-w-sm flex flex-col gap-5">
              <div className="bg-[#08032B] rounded-lg text-white p-6 shadow w-full hover:bg-[#08032B]/90 cursor-pointer transition-all duration-300 flex flex-col items-center gap-4">
                <img
                  src={categoryImage}
                  alt="image"
                  className="border border-white rounded-md object-contain"
                />

                <div className="flex items-center gap-2 w-full">
                  <MdOutlineInventory className="w-7 h-7" />
                  <p className="text-md font-semibold text-justify">
                    Qtech Inventory Support System
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <IoBuildOutline className="w-6 h-6" />
                  <p className="text-md font-semibold text-justify">
                    Service/ IT Management Solution
                  </p>
                </div>
              </div>
              <div className="bg-[#08032B] rounded-lg text-white p-6 shadow w-full hover:bg-[#08032B]/90 cursor-pointer transition-all duration-300 flex flex-col items-center gap-4">
                <img
                  src={categoryImage}
                  alt="image"
                  className="border border-white rounded-md object-contain"
                />

                <div className="flex items-center gap-2 w-full">
                  <RiBillLine className="w-7 h-7" />
                  <p className="text-md font-semibold text-justify">
                    Qtech Utility Billing System
                  </p>
                </div>

                <div className="flex items-center  gap-2 w-full">
                  <IoBuildOutline className="w-6 h-6" />
                  <p className="text-md font-semibold text-justify">
                    Service/ IT Management Solution
                  </p>
                </div>
              </div>
              <div className="bg-[#08032B] rounded-lg mb-5 text-white p-6 shadow w-full hover:bg-[#08032B]/90 cursor-pointer transition-all duration-300 flex flex-col items-center gap-4">
                <img
                  src={categoryImage}
                  alt="image"
                  className="border border-white rounded-md object-contain"
                />

                <div className="flex items-center gap-2 w-full">
                  <BsCashCoin className="w-7 h-7" />
                  <p className="text-md font-semibold text-justify">
                    Philippine HR, Payroll and Time Keeping System
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <IoBuildOutline className="w-6 h-6" />
                  <p className="text-md font-semibold text-justify">
                    Service/ IT Management Solution
                  </p>
                </div>
              </div>
            </div>

            <div className="-full md:w-1/2 max-w-sm flex flex-col gap-5">
              <div
                className="bg-[#08032B] rounded-lg text-white p-6 shadow w-full hover:bg-[#08032B]/90 cursor-pointer 
                  transition-all duration-300 flex flex-col items-center gap-4"
                onClick={() => navigate("/agent/tickets")}
              >
                <img
                  src={categoryImage}
                  alt="image"
                  className="border border-white rounded-md object-contain"
                />

                <div className="flex items-center gap-2 w-full ">
                  <MdOutlinePointOfSale className="w-6 h-6" />
                  <p className="text-md font-semibold text-justify">
                    POS for Retail and F&B
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <IoBuildOutline className="w-6 h-6" />
                  <p className="text-md font-semibold text-justify">
                    Service/ IT Management Solution
                  </p>
                </div>
              </div>
              <div className="bg-[#08032B] rounded-lg text-white p-6 shadow w-full hover:bg-[#08032B]/90 cursor-pointer transition-all duration-300 flex flex-col items-center gap-4">
                <img
                  src={categoryImage}
                  alt="image"
                  className="border border-white rounded-md object-contain"
                />

                <div className="flex items-center  gap-2 w-full">
                  <MdBarChart className="w-7 h-7" />
                  <p className="text-md font-semibold text-justify">
                    qSA (Quick and Simple Accounting)
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <IoBuildOutline className="w-6 h-6" />
                  <p className="text-md font-semibold text-justify">
                    Service/ IT Management Solution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
