import React, { useContext } from "react";

import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io5";
import { ContextOfProduct } from "../../context/MyContext";

export const SidebarData = [
  {
    title: "Home",
    titleAuth: "Home",
    path: "/",
    pathAuth: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },

  {
    title: "Men",
    titleAuth: "Men",
    path: "/men",
    pathAuth: "/men",
    icon: <IoIcons.IoMan />,
    cName: "nav-text",
  },
  {
    title: "Women",
    titleAuth: "Women",
    path: "/women",
    pathAuth: "/women",
    icon: <IoIcons.IoWoman />,
    cName: "nav-text",
  },
  {
    title: `Cart`,
    titleAuth: `Cart`,
    path: "/cart",
    pathAuth: "/cart",
    icon: <BsIcons.BsCart4 />,
    cName: "nav-text",
  },
  {
    title: "Sign In",
    titleAuth: "Disconnect",
    path: "/signin",
    pathAuth: "/signin",
    icon: <FaIcons.FaUserFriends />,
    cName: "nav-text",
  },
];
