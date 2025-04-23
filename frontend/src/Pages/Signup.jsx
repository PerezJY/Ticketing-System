import { useState } from "react";
import SignupImage from "../assets/hero-3.png";
import QtechLogo from "../assets/qtechlogo.png";
import { Link, useNavigate } from "react-router-dom";




export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      let data = null;

      const text = await response.text(); // get the raw text
      if (text) {
        data = JSON.parse(text); // safely parse if not empty
      }

      if (!response.ok) {
        setError(data?.message || "Registration failed.");
        return;
      }
      setTimeout(() => {
        setSuccess("Signup successful!");
        navigate('/')
      }, 1500);


    } catch (err) {
      console.error("Signup failed:", err);
      setError("An unexpected error occurred.");
    }finally {
      setLoading(true); 
    }
  };

  return (
    <div className="min-h-screen flex text-gray-950 font-sans">
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
          <Link to="#" className="text-sm font-medium text-black">
            About Us
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-blue-600 mb-2">Sign Up</h2>
        <p className="text-sm mb-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Signin
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus={true}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-md px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-sm text-blue-500"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" />
            <label>
              I have read & accept the{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            
            {loading ? "SignUp ..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
