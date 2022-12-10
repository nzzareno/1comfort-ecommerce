import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Navbar/Navbar.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import { ContextOfProduct } from "../../context/MyContext";
import { useDispatch } from "react-redux";
import Logo from "../../assets/v3log.svg";
import { motion } from "framer-motion";

const Sidebar = ({ auth, setAuth }) => {
  const [sidebar, setSidebar] = React.useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  const [disableBtn, setDisableBtn] = React.useState(false);
  let { googleUser, setGoogleUser, setIsSignedIn } =
    useContext(ContextOfProduct);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = googleUser?.token;
    setGoogleUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    const token = user;
    setUser(localStorage.getItem("token"));
  }, [location]);

  const handleLogOut = async () => {
    dispatch({ type: "LOGOUT" });
    setGoogleUser(null);
    setIsSignedIn(false);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {user || googleUser ? (
        <div
         
          className="contexto-side"
        >
          <IconContext.Provider value={{ color: " #fff" }}>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="navbarr"
            >
              <Link to="#" className="menu-bars">
                <FaBars onClick={() => setSidebar(!sidebar)} />
              </Link>
              <Link to="/">
                <img className="sidebar-logo" src={Logo} alt="LogoOneComfort" />
              </Link>
            </motion.div>

            <motion.nav
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 2,
              }}
              className={sidebar ? "nav-menu active" : "nav-menu"}
            >
              <ul
                className="nav-menu-items"
                onClick={() => setSidebar(!sidebar)}
              >
                <li className="navbar-toggle">
                  <Link to="/#" className="menu-bars">
                    <AiOutlineClose className="x-sidebar" />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={item.cName}
                      onClick={() =>
                        item.titleAuth === "Disconnect" && handleLogOut()
                      }
                    >
                      <Link to={user || googleUser ? item.pathAuth : item.path}>
                        {item.icon}
                        <span className="span-sidebar">
                          {user || googleUser ? item.titleAuth : item.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          </IconContext.Provider>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default Sidebar;
