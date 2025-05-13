import React, { useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { getLinks } from "../data/links";
import qtechLogo from "../assets/qtechlogo.png";
import { FaUserCircle } from "react-icons/fa";

import useUser from "../hooks/use-user";

export const Sidebar = () => {
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    logout,
    login,
  } = useStateContext();
  const location = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const user = useUser();
  const [links, setLinks] = useState({});

  if (!login) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (user) {
      setLinks(getLinks(user.role));
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize(width);
      setActiveMenu(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setActiveMenu, setScreenSize]);

  useEffect(() => {
    const currentPath = location.pathname.trim();
    const splitCurrentPath = currentPath.split("/");

    if (links) {
      const allLinks = [...(links.links || []), ...(links.subLinks || [])];

      allLinks.forEach((link) => {
        if (splitCurrentPath.length == 4) {
          const get2ndAndMid = `/${splitCurrentPath[1]}/${splitCurrentPath[2]}`;
          if (get2ndAndMid.trim() === link.path) {
            setActive(link.name);
          }
        }
        if (link.path === currentPath) {
          setActive(link.name);
        }
      });
    }
  }, [location, links]);

  return (
    <>
      {screenSize < 1024 && !activeMenu && (
        <div className="fixed top-9 lg:top-8 md:top-8 left-5 z-50">
          <MdMenuOpen
            className="text-2xl text-[#08032B] mx-3 rotate-180 cursor-pointer"
            onClick={() => setActiveMenu(true)}
          />
        </div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-[#08032B] text-white z-40 transition-all duration-300
        ${
          screenSize < 1024
            ? activeMenu
              ? "w-64"
              : "w-0"
            : activeMenu
            ? "w-72"
            : "w-25"
        }
        overflow-y-auto`}
      >
        <span
          className={`absolute cursor-pointer top-9.5 right-9 z-50 transition-transform ${
            !activeMenu ? "rotate-180 right-9" : ""
          }`}
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MdMenuOpen className="text-2xl" />
        </span>

        <div className="p-6 pt-8">
          <h1
            className={`origin-left font-bold text-2xl transition-all duration-300 cursor-pointer ${
              !activeMenu ? "scale-0" : ""
            }`}
          >
            <img src={qtechLogo} alt="Qtech Logo" className="h-8" />
          </h1>

          {/* User Profile Section */}
          <div className="border-t border-gray-500 mt-8" />
          {user && (
            <div
              className={`flex flex-col items-center gap-2 mt-15 transition-all duration-300
              ${activeMenu ? "w-full p-7" : "w-12 p-2 rounded-lg"}`}
            >
              <FaUserCircle
                className={`text-gray-300 transition-all duration-300 ${
                  activeMenu ? "text-7xl" : "text-3xl"
                }`}
              />
              {activeMenu && (
                <div className="text-md text-center capitalize">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-gray-400 text-sm capitalize">
                    {user.role}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-gray-500 mt-6" />
        </div>

        <div className="mt-5 px-3">
          {links && (
            <div className="text-sm p-3 space-y-3">
              {activeMenu && links.title && (
                <h3
                  className={`text-gray-400 uppercase text-xs tracking-wider px-4 transition-opacity duration-500 ${
                    activeMenu ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {links.title}
                </h3>
              )}

              {links.links &&
                links.links.map((link) => (
                  <Link
                    to={link.path}
                    key={link.name}
                    onClick={() => {
                      setActive(link.name);
                      if (screenSize < 1024) setActiveMenu(false);
                    }}
                    className={`flex items-center gap-4 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-300 ${
                      active === link.name
                        ? "bg-[#1D4ED8] text-white"
                        : "text-white hover:bg-[#1a1445]"
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    {activeMenu && <span>{link.name}</span>}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
