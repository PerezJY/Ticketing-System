import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  FaEnvelope,
  FaCreditCard,
  FaUndo,
  FaSearch,
  FaTruck,
  FaDollarSign,
  FaEdit,
  FaQuestionCircle,
} from "react-icons/fa";
import image from "../../assets/hero-3.png";

const CustomerDashboard = () => {
  const { activeMenu, user, login, logout } = useStateContext();
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300`}>
      <div className="bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-lg p-6 mt-10 md:mt-2 mb-10 max-w-7xl mx-auto">
        CUSTOMER DASHBOARD
      </div>
    </div>
  );
};

export default CustomerDashboard;
