import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // make sure useNavigate is imported here

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    setSubmitted(true);
    navigate("/otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0823] px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-[#1A56DB] text-center mb-4">
          Forgot Password
        </h2>

        {!submitted ? (
          <>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your email address and we'll send you an OTP to reset your
              password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1A56DB] focus:border-[#1A56DB]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1A56DB] text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </form>
          </>
        ) : (
          <Link
            to="/otp"
            className="text-green-600 text-center block hover:underline"
          >
            An OTP has been sent to your email. Click here to enter it.
          </Link>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-[#1A56DB] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
