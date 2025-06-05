import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { getNavbarLinks } from "../data/navbarLinks";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../hooks/use-user";
import { FiUser } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import qtechLogo from "../assets/qtechlogo.png";

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffSeconds = Math.floor((now - time) / 1000);

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
  return `${Math.floor(diffSeconds / 86400)}d ago`;
};

const Navbar = () => {
   const { activeMenu, logout, token, user } = useStateContext();
  const userData = useUser();
 const navigate = useNavigate();
   const [navbarLinks, setNavbarLinks] = useState(null);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState(null);
  const mobileMenuCloseBtnRef = useRef(null);
  useEffect(() => {
    if (user) {
      setNavbarLinks(getNavbarLinks(user.role));
    }
  }, [user]);


   useEffect(() => {
    if (!notifDropdown) return;
    if (!token || !user?.id) return;

    const fetchNotifications = async () => {
      setNotifLoading(true);
      setNotifError(null);
      try {
        const { role } = user;
          let url = "";
        switch (role) {
          case "customer":
            url = `http://localhost:8000/api/Customernotifications/${user.id}`;
            break;
          case "admin":
            url = "http://localhost:8000/api/allNotifications";
            break;
          case "agent":
            url = `http://localhost:8000/api/agentnotifications/${user.id}`;
            break;
          default:
            return;
        }
        if (!url) return;
         const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
         const data = await res.json();
        setNotifications(Array.isArray(data) ? data : []);
       
      } catch (error) {
        setNotifError(error.message || "Failed to load notifications");
      } finally {
        setNotifLoading(false);
      }
    };

    fetchNotifications();
  }, [notifDropdown, token, user]);

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
      navigate("/signin");
    }
  };
   // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const notifDropdownEl = document.getElementById("notif-dropdown");
      const profileDropdownEl = document.getElementById("profile-dropdown");
      const notifButtonEl = document.getElementById("notif-button");
      const profileButtonEl = document.getElementById("profile-button");

      if (
        notifDropdown &&
        notifDropdownEl &&
        !notifDropdownEl.contains(event.target) &&
        notifButtonEl &&
        !notifButtonEl.contains(event.target)
      ) {
        setNotifDropdown(false);
      }

      if (
        profileDropdown &&
        profileDropdownEl &&
        !profileDropdownEl.contains(event.target) &&
        profileButtonEl &&
        !profileButtonEl.contains(event.target)
      ) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifDropdown, profileDropdown]);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuCloseBtnRef.current) {
      mobileMenuCloseBtnRef.current.focus();
    }
  }, [mobileMenuOpen]);

  return (
    <div
      className={`fixed top-0 z-30  w-full flex justify-end items-center
    px-4 sm:px-6 py-4
    transition-all duration-300
    ${
      activeMenu
        ? user?.role === "admin" || user?.role === "agent"
          ? "lg:pl-72"
          : "xl:pl-35"
        : "lg:pl-25"
    }
    ${
      user?.role === "customer"
        ? "bg-white text-black shadow-xs"
        : "bg-white text-black shadow-md"
    }
  `}
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
        <div className="flex-1 items-center mx-3.5 xl:mx-0 hidden lg:flex">
          <Link to="/customer/home">
            <img
              src={qtechLogo}
              alt="Qtech Logo"
              className="h-14 cursor-pointer"
            />
          </Link>
        </div>
      )}

      <div className="items-center justify-center flex-4 hidden xl:flex">
        {navbarLinks?.navLinks && (
          <div className="flex items-center gap-10">
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
            {user?.role === "customer" && (
              <div>
                <Link to="/customer/create-ticket">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded-md flex items-center justify-center w-full md:w-auto cursor-pointer">
                    <FaEdit className="mr-2" /> Create Ticket
                  </button>
                </Link>
              </div>
            )}
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
                   {notifications.map((notif) => (
                  <li
                    key={notif.ticket_id}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                    onClick={() => handleNotifClick(notif)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleNotifClick(notif);
                      }
                    }}
                  >
                    <div className="font-semibold">
                      {notif.name
                        ? `${notif.name} posted a ticket`
                        : `${notif.title}`}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTimeAgo(notif.created_at)}
                    </div>
                  </li>
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
          {user ? (
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
          ) : (
            <div className="flex gap-2">
              <Link
                to="/Signin"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
              <Link
                to="/Signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;