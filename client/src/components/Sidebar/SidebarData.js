import React from "react";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "HOME",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "SEARCH",
    path: "#",
    icon: <AiIcons.AiOutlineSearch />,
    cName: "nav-text",
  },

  {
    title: "MEN",
    path: "/men",
    icon: <IoIcons.IoMan />,
    cName: "nav-text",
  },
  {
    title: "WOMEN",
    path: "/women",
    icon: <IoIcons.IoWoman />,
    cName: "nav-text",
  },
  {
    title: "SPREAD PRODUCT",
    path: "/make-product",
    icon: <MdIcons.MdPostAdd />,
    cName: "nav-text",
  },
  {
    title: "CART"+"(4)",
    path: "/cart",
    icon: <BsIcons.BsCart4 />,
    cName: "nav-text",
  },
  {
    title: "SIGN IN",
    path: "/signin",
    icon: <FaIcons.FaUserFriends />,
    cName: "nav-text",
  },
];
