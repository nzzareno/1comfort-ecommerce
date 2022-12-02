import React, { useContext } from "react";

import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io5";
import { ContextOfProduct } from "../../context/MyContext";

export const SidebarData = [
  {
    title: "HOME",
    titleAuth: "HOME",
    path: "/",
    pathAuth: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },

  {
    title: "MEN",
    titleAuth: "MEN",
    path: "/men",
    pathAuth: "/men",
    icon: <IoIcons.IoMan />,
    cName: "nav-text",
  },
  {
    title: "WOMEN",
    titleAuth: "WOMEN",
    path: "/women",
    pathAuth: "/women",
    icon: <IoIcons.IoWoman />,
    cName: "nav-text",
  },
  {
    title: `CART`,
    titleAuth: `CART`,
    path: "/cart",
    pathAuth: "/cart",
    icon: <BsIcons.BsCart4 />,
    cName: "nav-text",
  },
  {
    title: "SIGN UP",
    titleAuth: "DISCONNECT",
    path: "/signup",
    pathAuth: "/auth/logout",
    icon: <FaIcons.FaUserFriends />,
    cName: "nav-text",
  },
];
