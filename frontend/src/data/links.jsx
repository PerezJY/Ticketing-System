import React from "react";
import {
  MdOutlineDashboard,
  MdNotificationsNone,
  MdOutlineSupportAgent,
  MdSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { TbTicket } from "react-icons/tb";
import { LuTicket } from "react-icons/lu";

export const getLinks = (userRole) => {
  if (!userRole) return null;
  switch (userRole) {
    case "admin":
      return {
        title: "Menu",
        links: [
          {
            name: "Dashboard",
            icon: <MdOutlineDashboard />,
            path: "/admin/dashboard",
          },
          {
            name: "Tickets",
            icon: <TbTicket />,
            path: "/admin/ticketCategories",
          },
          {
            name: "Agents",
            icon: <MdOutlineSupportAgent />,
            path: "/admin/agent",
          },
          {
            name: "Notification",
            icon: <MdNotificationsNone />,
            path: "/admin/notification",
          },
        ],
        subLinks: [
          {
            name: "Profile",
            icon: <FiUser />,
            path: "/admin/profile",
          },
          {
            name: "Logout",
            icon: <MdOutlineLogout />,
            path: null,
          },
        ],
      };
    case "customer":
      return {
        title: "Menu",
        links: [
          {
            name: "Dashboard",
            icon: <MdOutlineDashboard />,
            path: "/customer/dashboard",
          },
          {
            name: "Tickets",
            icon: <TbTicket />,
            path: "/customer/create-ticket",
          },
          {
            name: "Notification",
            icon: <MdNotificationsNone />,
            path: "/customer/notification",
          },
        ],
        subLinks: [
          {
            name: "Logout",
            icon: <MdOutlineLogout />,
            path: null,
          },
        ],
      };
    case "agent":
      return {
        title: "Menu",
        links: [
          {
            name: "Dashboard",
            icon: <MdOutlineDashboard />,
            path: "/agent/dashboard",
          },

          {
            name: "Notification",
            icon: <MdNotificationsNone />,
            path: "/agent/notification",
          },
          {
            name: "Tickets",
            icon: <TbTicket />,
            path: "/agent/tickets",
          },
        ],
        subLinks: [
          {
            name: "Logout",
            icon: <MdOutlineLogout />,
            path: null,
          },
        ],
      };
  }
};
