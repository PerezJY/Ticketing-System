import { useState } from "react";
import QtechLogo from "../assets/qtechlogo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Hero1 from "../assets/hero-1.jpg";
import Hero2 from "../assets/hero-2.jpg";
import Hero3 from "../assets/hero-3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStateContext } from "../contexts/ContextProvider";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("customer");
  const { user, login } = useStateContext();
  const navigate = useNavigate();
  const [TermsOpenModal, setTermsOpenModal] = useState(false);

  const carousel = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  if (!login && !user?.id) {
    return <Navigate to="/" />;
  }

  const openModal = (e) => {
    e.preventDefault();
    setTermsOpenModal(true);
  };

  const closeModal = () => {
    setTermsOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!isTermsAccepted) {
      setError("You must accept the terms and conditions to register.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
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
          role: role,
          password_confirmation: confirmPassword,
          terms_accepted: isTermsAccepted,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setSuccess(
        "Registration successful! Please check your email for login credentials."
      );
      // Store the token if needed
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect after a short delay to allow user to read the success message
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Signup failed:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0D0630] p-5 md:p-12">
      <div className="flex w-full max-w-7xl bg-white shadow rounded-xl overflow-hidden max-h-[650px] h-auto md:h-[550px]">
        <div className="hidden lg:block w-1/2 bg-[#0D0630] pt-15 px-21 border border-white rounded-l-xl">
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
            <Link
              to="/about"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              About Us
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-blue-600 mb-2">Sign Up</h2>
          <p className="text-sm mb-4">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoFocus={true}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border  rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg text-sm px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border  rounded-lg text-sm px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-2.5 text-lg text-gray-500"
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="cursor-pointer" />
                ) : (
                  <FiEye className="cursor-pointer" />
                )}
              </button>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm">
                I accept the{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={openModal}
                >
                  Terms and Conditions
                </button>
              </label>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-500 text-sm">{success}</div>}

            {TermsOpenModal && (
              <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
                <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-10">
                  <h2 className="text-2xl font-bold mb-4 text-[#1D4ED8]">
                    Terms and Conditions
                  </h2>
                  <h2 className="text-lg font-bold mb-3 text-black">
                    Your Agreement
                  </h2>
                  <h2 className="text-sm text-gray-800 mb-3">
                    Welcome to the Qtech Business Solution, Inc. Ticketing
                    System. By accessing or using our platform, you agree to
                    comply with and be bound by the following Terms and
                    Conditions. Please read them carefully.
                  </h2>
                  <div className="text-gray-600 text-sm space-y-3 overflow-y-auto max-h-70">
                    <div>
                      <h3 className="font-semibold">1. Use of Service</h3>
                      <p>
                        • This platform is intended for submitting inquiries,
                        concerns, or support requests related to the services of
                        Qtech Business Solution, Inc.
                      </p>
                      <p>
                        • Any misuse of the system for spam, abusive language,
                        or unrelated issues is strictly prohibited.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">2. Account Registration</h3>
                      <p>
                        • You must provide accurate and complete information
                        when creating an account.
                      </p>
                      <p>
                        • You are responsible for maintaining the
                        confidentiality of your login credentials.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold"> 3. Data Collection</h3>
                      <p>
                        • We collect basic personal information such as your
                        name and email address solely for the purpose of
                        providing support.
                      </p>
                      <p>
                        • You are responsible for maintaining the
                        confidentiality of your login credentials.
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-semibold ">4. Response Time</h3>
                      <p>
                        • We aim to respond to all submitted tickets within a
                        reasonable timeframe, but response times may vary
                        depending on volume and issue complexity.
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-semibold "> 5. System Changes</h3>
                      <p>
                        • Qtech Business Solution, Inc. reserves the right to
                        update, modify, or discontinue any part of the system at
                        any time without prior notice.
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-semibold ">
                        6. Limitation of Liability
                      </h3>
                      <p>
                        • Qtech Business Solution, Inc. is not liable for any
                        loss or damage arising from the use or inability to use
                        the support system, unless caused by gross negligence on
                        our part.
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-semibold ">
                        7. Intellectual Property
                      </h3>
                      <p>
                        • All content and materials within this platform,
                        including system design and branding, are the
                        intellectual property of Qtech Business Solution, Inc.
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-semibold ">8. Confidentiality</h3>
                      <p>
                        • All information shared through the support ticketing
                        system shall be treated as confidential. Both Qtech
                        Business Solution, Inc. and the user are expected to
                        handle sensitive information responsibly.
                      </p>
                    </div>
                    <div>
                      <h3 className=" font-semibold ">
                        9. Third-Party Services
                      </h3>
                      <p>
                        • The ticketing system may integrate with third-party
                        tools or services. Qtech Business Solution, Inc. is not
                        responsible for any data handled by these external
                        platforms, and users are encouraged to review their
                        respective privacy policies.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  Signing up...
                  <span>
                    {" "}
                    <div className=" text-center text-gray-500 flex items-center justify-center gap-2">
                      <svg
                        aria-hidden="true"
                        className="animate-spin h-6 w-6 text-blue-800 fill-gray-200"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5C100 78.3 77.6 100.5 50 
      100.5C22.4 100.5 0 78.3 0 50.5C0 22.7 
      22.4 0.5 50 0.5C77.6 0.5 100 22.7 100 
      50.5ZM9.1 50.5C9.1 73.5 27 91.4 50 
      91.4C73 91.4 90.9 73.5 90.9 50.5C90.9 
      27.5 73 9.6 50 9.6C27 9.6 9.1 27.5 9.1 
      50.5Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9 39.0C96.8 38.3 98.5 35.2 
      97.4 32.4C95.5 27.7 92.9 23.3 
      89.5 19.4C85.5 14.9 80.6 11.3 
      75.1 8.8C69.6 6.3 63.6 5 57.5 
      5C54.4 5 52 7.4 52 10.5C52 13.6 
      54.4 16 57.5 16C61.8 16 66 16.9 
      69.8 18.7C73.6 20.5 77 23.1 79.7 
      26.4C81.8 28.9 83.5 31.8 84.7 
      35C85.7 37.8 91.1 39.7 93.9 39Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </span>
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
