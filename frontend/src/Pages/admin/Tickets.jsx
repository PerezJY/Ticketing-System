import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export const Tickets = () => {
  const { activeMenu } = useStateContext();
  return (
    <div
      className={`
  mx-5 md:mx-5 lg:mx-5
  transition-all duration-300 
  ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
`}
    >
      <div className="text-3xl font-bold text-[#1D4ED8]">Tickets</div>
      dito mo sana  nilagay
    </div>
  );
};
