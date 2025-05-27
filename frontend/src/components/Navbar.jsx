import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { getNavbarLinks } from "../data/navbarLinks";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../hooks/use-user";
import { FiUser } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";

const Navbar = () => {
  const { activeMenu, logout } = useStateContext();
  const user = useUser();
  const navigate = useNavigate();
  const [navbarLinks, setNavbarLinks] = useState(null);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setNavbarLinks(getNavbarLinks(user.role));
    }
  }, [user]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D0630",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      await Swal.fire("Logged Out", "See you next time!", "success");
      logout();
      navigate("/");
    }
  };

  return (
    <div
      className={`fixed top-0 z-30 bg-white shadow-md w-full flex justify-end items-center px-4 sm:px-6 py-4 transition-all duration-300 ${
        activeMenu
          ? user?.role === "admin" || user?.role === "agent"
            ? "lg:pl-72"
            : "xl:pl-35"
          : "lg:pl-25"
      }`}
    >
      {/* Mobile View */}
      {user?.role === "customer" && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-2xl mx-5 lg:hidden flex-2 cursor-pointer"
        >
          <MdMenuOpen className="rotate-180" />
        </button>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#08032B] text-white max-w-3/4 z-50 overflow-hidden flex flex-col items-center justify-center gap-6 p-6 transition-all duration-300">
          {navbarLinks?.navLinks &&
            navbarLinks.navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg transition ${
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "text-white hover:text-blue-500 font-semibold"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

          {user?.role === "customer" && (
            <Link
              to="/customer/create-ticket"
              onClick={() => setMobileMenuOpen(false)}
            >
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md flex items-center justify-center cursor-pointer">
                <FaEdit className="mr-2" /> Create Ticket
              </button>
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-4xl cursor-pointer hover:text-blue-500"
          >
            &times;
          </button>
        </div>
      )}

      {/* Desktop Navbar */}
      {user?.role === "customer" && (
        <div className="flex-2 items-center mx-3.5 xl:mx-0 hidden lg:flex">
          <Link to="/customer/create-ticket">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center w-full md:w-auto cursor-pointer">
              <FaEdit className="mr-2" /> Create Ticket
            </button>
          </Link>
        </div>
      )}

      <div className="items-center justify-center flex-2 hidden lg:flex">
        {navbarLinks?.navLinks && (
          <div className="flex items-center gap-6">
            {navbarLinks.navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-md transition ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-800 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {navbarLinks && (
        <div
          className={`flex items-center py-3.5 gap-4 relative ${
            user?.role === "admin" || user?.role === "agent"
              ? "right-4"
              : "right-4 lg:right-28"
          }`}
        >
          {/* Notifications */}
          <div className="relative">
            <button
              className="text-xl text-gray-800 border border-gray-500 rounded-t-full rounded-b-full p-2 hover:bg-gray-100 relative cursor-pointer"
              onClick={() => {
                setNotifDropdown(!notifDropdown);
                setProfileDropdown(false);
              }}
            >
              {navbarLinks.notifications.icon}
              {navbarLinks.notifications.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {navbarLinks.notifications.count}
                </span>
              )}
            </button>
            {notifDropdown && (
              <div className="absolute right-0 mt-2 w-[26rem] bg-white shadow-lg rounded-lg z-50 p-4">
                <p className="text-lg font-semibold mb-3 text-blue-600">
                  Notifications
                </p>
                <ul className="space-y-3 max-h-80 overflow-y-auto">
                  {[
                    {
                      id: 1,
                      name: "Kate Young",
                      message: "Message here",
                      time: "5 mins ago",
                    },
                    {
                      id: 2,
                      name: "Brandon Newman",
                      message: "Message here",
                      time: "21 mins ago",
                    },
                    {
                      id: 3,
                      name: "Dave Wood",
                      message: "Message here",
                      time: "2 hrs ago",
                    },
                    {
                      id: 4,
                      name: "Kate Young",
                      message: "Message here",
                      time: "3 hrs ago",
                    },
                    {
                      id: 5,
                      name: "Anna Lee",
                      message: "Message here",
                      time: "1 day ago",
                    },
                  ].map((notif) => (
                    <Link
                      to={navbarLinks.notifications.path}
                      key={notif.id}
                      className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded-lg transition duration-150"
                      onClick={() => setNotifDropdown(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={40}
                        height={40}
                        viewBox="0 0 16 16"
                        className="text-gray-500 flex-shrink-0"
                      >
                        <path
                          fill="currentColor"
                          d="M11 7c0 1.66-1.34 3-3 3S5 8.66 5 7s1.34-3 3-3s3 1.34 3 3"
                        />
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M16 8c0 4.42-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8M4 13.75C4.16 13.484 5.71 11 7.99 11c2.27 0 3.83 2.49 3.99 2.75A6.98 6.98 0 0 0 14.99 8c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 2.38 1.19 4.49 3.01 5.75"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold text-blue-600">
                            {notif.name}
                          </span>
                          <span className="text-gray-700"> {notif.message}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    </Link>
                  ))}
                </ul>
                <Link
                  to={navbarLinks.notifications.path}
                  className="block text-blue-600 mt-3 text-center hover:underline"
                  onClick={() => setNotifDropdown(false)}
                >
                  See All
                </Link>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              className="text-xl text-gray-800 border border-gray-500 rounded-t-full rounded-b-full p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setProfileDropdown(!profileDropdown);
                setNotifDropdown(false);
              }}
            >
              {user?.username || <FiUser />}
            </button>
            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 p-2 cursor-pointer">
                {navbarLinks.profileMenu.map((item) => {
                  if (item.name === "Logout") {
                    return (
                      <button
                        key={item.name}
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left text-md hover:bg-gray-100 cursor-pointer text-gray-800 mt-4 pt-4 border-t border-gray-200"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-md">{item.name}</span>
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center gap-2 px-3 py-2 text-md hover:bg-gray-100"
                      onClick={() => setProfileDropdown(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-md">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
