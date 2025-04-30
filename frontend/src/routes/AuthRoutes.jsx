import Signin from "../Pages/Signin";
import Signup from "../pages/Signup";
import Forgotpass from "../Pages/Forgotpass";
import Otp from "../Pages/Otp";
import About from "../Pages/About";
import { Routes, Route } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<Forgotpass />} />
      <Route path="/Otp" element={<Otp />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AuthRoutes;
