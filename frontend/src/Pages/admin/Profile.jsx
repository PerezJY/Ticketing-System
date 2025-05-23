import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navigate } from "react-router-dom";
import Layout from "../../layout/Layout";

const profileSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required."),
  email: yup.string().email("Invalid email").required("Email is required."),
});

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required."),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("New password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match.")
    .required("Please confirm your password."),
});

export const Profile = () => {
  const { activeMenu, user, login } = useStateContext();
  const [showPassword, setShowPassword] = React.useState(false);

  // Redirect if not logged in
  if (!login && !user) {
    return <Navigate to="/" />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Layout>
      <div
        className={`
mx-5 md:mx-5 lg:mx-5
transition-all duration-300 
${activeMenu ? "lg:pl-75" : "lg:pl-25"}
`}
      >
        <div className="text-3xl font-bold text-[#1D4ED8]">Profile</div>
        <div className="text-sm font-semibold text-gray-500">
          Manage and protect your account
        </div>
        <div className="mt-10 grid grid-cols-12 gap-8 ">
          <div className="flex justify-center items-center col-span-12 md:col-span-4 p-4 rounded-xl shadow "></div>
          <div className="col-span-12 md:col-span-8 p-4 rounded-xl shadow">
            <div className="p-6 text-md font-semibold">
              Edit Profile Details
              <div className="mt-3 border-t border-gray-300" />
            </div>
            <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName")}
                    className="w-full p-2 border rounded-lg text-sm px-4"
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full p-2 border rounded-lg text-sm px-4"
                />
                {errors.email && (
                  <p className="mt-1.5 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" bg-blue-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="col-span-12 md:col-span-4 p-4 rounded-xl shadow ">
            <div className="block p-4">
              <div className="p-4 font-semibold text-md">
                Profile Details
                <div className="mt-3 border-t border-gray-300" />
              </div>
              <div className="mt-3 px-4 text-sm">Name: [Administrator]</div>
              <div className="mt-3 px-4 text-sm">Email: [admin@gmail.com]</div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 p-4 rounded-xl shadow">
            <div className="p-6 text-md font-semibold">
              Change Password
              <div className="mt-3 border-t border-gray-300" />
            </div>
            <form
              className="p-6 space-y-6"
              onSubmit={handlePasswordSubmit((data) =>
                console.log("Password Form:", data)
              )}
            >
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  {...registerPassword("currentPassword")}
                  className="w-full p-2 border rounded-lg text-sm px-4"
                />
                {passwordErrors.currentPassword && (
                  <p className="mt-1.5 text-red-500 text-sm">
                    {passwordErrors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...registerPassword("newPassword")}
                  className="w-full p-2 border rounded-lg text-sm px-4"
                />
                {passwordErrors.newPassword && (
                  <p className="mt-1.5 text-red-500 text-sm">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...registerPassword("confirmPassword")}
                  className="w-full p-2 border rounded-lg text-sm px-4"
                />
                {passwordErrors.confirmPassword && (
                  <p className="mt-1.5 text-red-500 text-sm">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  onChange={() => setShowPassword((prev) => !prev)}
                  className="accent-blue-600"
                />
                Show Password
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
