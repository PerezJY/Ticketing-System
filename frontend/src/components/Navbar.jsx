import React, { useEffect, useState, useCallback, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { getNavbarLinks } from "../data/navbarLinks";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../hooks/use-user";
import { MdMenuOpen } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import qtechLogo from "../assets/qtech-logo.png"; // Make sure this file exists in this path

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

  // Load navbar links based on user role
  useEffect(() => {
    if (userData) {
      setNavbarLinks(getNavbarLinks(userData.role));
    } else {
      setNavbarLinks(null);
    }
  }, [userData]);

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (!notifDropdown) return;
    if (!token || !user?.id) return;

    const fetchNotifications = async () => {
      setNotifLoading(true);
      setNotifError(null);
      try {
        const url =
          user?.role === "admin"
            ? "http://localhost:8000/api/allTickets" // Admin sees all tickets
            : "http://localhost:8000/api/tickets"; // User tickets endpoint fixed here

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok)
          throw new Error(
            `Failed to fetch notifications: ${res.status} ${res.statusText}`
          );

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

  // Confirm logout
  const handleLogout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D0630",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    });

    if (isConfirmed) {
      await Swal.fire("Logged Out", "See you next time!", "success");
      logout();
      navigate("/");
    }
  };

  // Handle notification click - navigate to notification details page
  const handleNotifClick = useCallback(
    (notif) => {
      if (!notif || !notif.id) {
        Swal.fire("Error", "Invalid notification data.", "error");
        return;
      }

      const validRoles = ["admin", "agent", "customer"];
      if (!validRoles.includes(user?.role)) {
        Swal.fire("Error", "Invalid user role for navigation.", "error");
        return;
      }

      navigate(`/${user.role}/notification/${notif.id}`, {
        state: { notification: notif },
      });
      setNotifDropdown(false);
    },
    [navigate, user?.role]
  );

  // Toggle dropdowns
  const toggleNotifDropdown = () => {
    setNotifDropdown((prev) => !prev);
    setProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown((prev) => !prev);
    setNotifDropdown(false);
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
    <nav className={`fixed top-0 w-full bg-white shadow flex justify-end p-4`}>
      {/* Mobile menu toggle */}
      {user?.role === "customer" && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden mr-4"
        >
          <MdMenuOpen className="rotate-180" />
        </button>
      )}

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 bg-[#08032B] text-white z-50 flex flex-col items-center justify-center gap-6 p-6"
          role="dialog"
          aria-modal="true"
        >
          {navbarLinks?.navLinks?.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold"
                  : "text-white font-semibold"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user?.role === "customer" && (
            <Link to="/customer/create-ticket" onClick={() => setMobileMenuOpen(false)}>
              <button className="btn btn-primary">Create Ticket</button>
            </Link>
          )}

          <button
            ref={mobileMenuCloseBtnRef}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="mt-8 underline"
          >
            Close Menu
          </button>
        </div>
      )}

      {/* Notifications button */}
      <button
        id="notif-button"
        aria-haspopup="true"
        aria-expanded={notifDropdown}
        aria-controls="notif-dropdown"
        onClick={toggleNotifDropdown}
        className="relative mr-6"
        title="Notifications"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-red-100 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification dropdown and desktop navbar */}
      {notifDropdown && (
        <>
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
              id="notif-dropdown"
              role="menu"
              aria-label="Notifications"
              className="absolute right-4 top-14 w-80 max-h-96 overflow-auto bg-white border rounded shadow-lg z-50"
            >
              {notifLoading && <div className="p-4">Loading...</div>}
              {notifError && <div className="p-4 text-red-600">{notifError}</div>}
              {!notifLoading && !notifError && notifications.length === 0 && (
                <div className="p-4 text-gray-500">No notifications</div>
              )}
              <ul>
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
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
                      {notif.customer_name
                        ? `${notif.customer_name} posted a ticket`
                        : "New notification"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTimeAgo(notif.created_at)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Profile dropdown */}
      <button
        id="profile-button"
        aria-haspopup="true"
        aria-expanded={profileDropdown}
        aria-controls="profile-dropdown"
        onClick={toggleProfileDropdown}
        className="ml-4"
        title="Profile options"
      >
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="User avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>

      {profileDropdown && (
        <div
          id="profile-dropdown"
          role="menu"
          aria-label="Profile options"
          className="absolute right-4 top-14 w-44 bg-white border rounded shadow-lg z-50"
        >
          <Link
            to={`/${user?.role}/profile`}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
