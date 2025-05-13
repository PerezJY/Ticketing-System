import { MdNotificationsNone, MdOutlineLogout } from "react-icons/md";
import { FiUser } from "react-icons/fi";

export const getNavbarLinks = (userRole) => {
  if (!userRole) return null;

  switch (userRole) {
    case "admin":
      return {
        notifications: {
          icon: <MdNotificationsNone />,
          path: "/admin/notification",
          count: 2,
        },
        profileMenu: [
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

    case "agent":
      return {
        notifications: {
          icon: <MdNotificationsNone />,
          path: "/agent/notification",
          count: 4,
        },
        profileMenu: [
          {
            name: "Logout",
            icon: <MdOutlineLogout />,
            path: null,
          },
        ],
      };

    case "customer":
      return {
        navLinks: [
          {
            name: "Dashboard",
            path: "/customer/dashboard",
          },
          {
            name: "Tickets",
            path: "/customer/tickets",
          },
        ],
        notifications: {
          icon: <MdNotificationsNone />,
          path: "/customer/notification",
          count: 2,
        },
        profileMenu: [
          {
            name: "Logout",
            icon: <MdOutlineLogout />,
            path: null,
          },
        ],
      };

    default:
      return null;
  }
};
