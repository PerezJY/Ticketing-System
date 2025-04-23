import { useState,useEffect } from "react";
import SignupImage from "../assets/signup.jpg";
import QtechLogo from "../assets/qtechlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user,login,token} = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        const { role } = parsedUser;
        switch (role) {
          case "customer":
            navigate("/customer");
            break;
          case "admin":
            navigate("/admin");
            break;
          case "agent":
            navigate("/agent");
            break;
          default:
            navigate("/");
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user"); // Clean up if parsing fails
      }
    }
  }, [navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
      try{
        const response = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          })
        });
        if (!response.ok) {
          throw new Error("Login failed");
        }
      // Optional: extract data if needed
      const data = await response.json();
      console.log("Login successful:", data);

      const {  user,token } = data;

      login(user,token);
      
      const { role } = user;
      switch (role) {
        case "customer":
          navigate("/customer");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "agent":
          navigate("/agent");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    }
  }
  
  
  return (
    <div className="min-h-screen flex text-gray-900 font-sans">
      {/* Left Section */}
      <div className="w-1/2 bg-[#0D0630] text-white flex flex-col justify-center items-start p-12 space-y-6">
        <img src={QtechLogo} alt="Qtech Logo" className="h-12 mb-4" />
        <h1 className="text-3xl font-bold">We simply position ourselves</h1>
        <p className="text-sm text-gray-300">
          as an ICT company for those who have no ICT department.
        </p>
        <img
          src={SignupImage}
          alt="Cloud Visual"
          className="rounded-lg max-w-md mt-4"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white p-12 rounded-r-xl flex flex-col justify-center">
        <div className="flex justify-end mb-4">
          <Link
            to="/admin/dashboard"
            className="text-sm font-medium text-black"
          >
            About Us
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-blue-600 mb-2">Sign In</h2>
        <p className="text-sm mb-4">
          Don't have an account?{" "}
          <Link
            to="/Signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Signup
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value) }


            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus={true}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Forgot Password on the Left Side */}
          <div className="flex justify-start">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
};

export default Signin;
