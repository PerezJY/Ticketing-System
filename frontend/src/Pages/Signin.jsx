import { useEffect, useState } from "react";
import QtechLogo from "../assets/qtechlogo.png";
import Hero1 from "../assets/hero-1.jpg";
import Hero2 from "../assets/hero-2.jpg";
import Hero3 from "../assets/hero-3.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStateContext } from "../contexts/ContextProvider";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, login } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pageLoading, pageSetLoading] = useState(false);

  const handleNavigation = (event) => {
    event.preventDefault();
    pageSetLoading(true);

    setTimeout(() => {
      navigate("/Signup");
      pageSetLoading(false);
    }, 700);
  };

  useEffect(() => {
    if (login && user) {
      const { role } = user;
      switch (role) {
        case "customer":
          navigate("/customer/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "agent":
          navigate("/agent/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [login, user, navigate]);

  const carousel = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or server error.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      const { user, token } = data; // Make sure you are receiving the token
      localStorage.setItem("user", JSON.stringify(user)); // Save user details
      localStorage.setItem("token", token); // Store the token in localStorage for later use

      const { role } = user;
      
      switch (role) {
        case "customer":
          navigate("/customer/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "agent":
          navigate("/agent/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0D0630] p-5 md:p-12">
      <div className="flex w-full max-w-7xl bg-white shadow rounded-lg overflow-hidden max-h-[650px] h-auto md:h-[550px]">
        <div className="hidden lg:block w-1/2 bg-[#0D0630] pt-15 px-21 border border-white rounded-lg">
          <img src={QtechLogo} alt="Qtech Logo" className="w-24 mb-4" />
          <h1 className="text-3xl mt-10 text-white font-bold">
            We simply position ourselves
          </h1>
          <p className="text-sm mt-4 text-gray-300">
            as an ICT company for those who have no ICT department.
          </p>
          <div className="flex justify-center">
            <div className="max-w-[409px] md:max-w-[408px] sm:max-w-[300px] rounded-lg w-full mt-10">
              <Slider {...carousel}>
                <div>
                  <img src={Hero1} alt="Hero 1" className="w-full h-auto" />
                </div>
                <div>
                  <img src={Hero2} alt="Hero 2" className="w-full h-auto" />
                </div>
                <div>
                  <img src={Hero3} alt="Hero 3" className="w-full h-auto" />
                </div>
              </Slider>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 md:p-25 flex flex-col justify-center">
          <div className="flex justify-end mb-6 md:mb-10">
            <Link to="/about" className="text-sm font-medium text-black">
              About Us
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-blue-600 mb-6">Sign In</h2>
          <p className="text-sm mb-6">
            Don't have an account?{" "}
            {pageLoading && (
              <div className="spinner-overlay">
                <div className="loading-line"></div>
              </div>
            )}
            <Link
              to="/Signup"
              onClick={handleNavigation}
              className="text-blue-600 font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border text-sm rounded-lg px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-2.5 text-lg text-gray-500"
              >
                {showPassword ? (
                  <FiEyeOff className="cursor-pointer" />
                ) : (
                  <FiEye className="cursor-pointer" />
                )}
              </button>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-start">
              <Link
                to="/forgot-password"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  Signing in...
                  <span>
                    {" "}
                    <div className=" text-center text-gray-500 flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                    </div>
                  </span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
