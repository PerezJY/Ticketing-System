import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export const AgentDashboard = () => {
  const { activeMenu,user,login } = useStateContext();
  
  // Redirect if not logged in
  if(!login && !user){
    return <Navigate to ='/'/>
  }
  return (
    <div
      className={`
    mx-5 md:mx-5 lg:mx-5
    transition-all duration-300 
    ${activeMenu ? "lg:pl-75" : "lg:pl-25"}
  `}
    >
      <div className="text-3xl font-bold text-[#1D4ED8]">Agent Dashboard</div>
      
    </div>
  
  );
};

export default AgentDashboard;
