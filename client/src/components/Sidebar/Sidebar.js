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

const Sidebar = ({ auth, setAuth }) => {
  const [sidebar, setSidebar] = React.useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  const [disableBtn, setDisableBtn] = React.useState(false);
  let { googleUser, setGoogleUser, show, setShow, setIsSignedIn } =
    useContext(ContextOfProduct);
  const location = useLocation();
  const navigate = useNavigate();
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
    navigate("/signin");
    setGoogleUser(null);
    setIsSignedIn(false);
  };

  const toggleSidebar = (e) => {
    setSidebar(!sidebar);
  };

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const esconderSidebar = (e) => {
    if (e.keyCode === 27) {
      setSidebar(false);
    }
  };
  const storageProducts = JSON.parse(localStorage.getItem("products"));
  return (
    <>
      {user || googleUser ? (
        <div className="contexto-side">
          <IconContext.Provider value={{ color: " #fff" }}>
            <div className="navbarr">
              <Link to="#" className="menu-bars">
                <FaBars onClick={showSidebar} />
              </Link>
              <Link to="/">
                <img className="sidebar-logo" src={Logo} alt="LogoOneComfort" />
              </Link>
            </div>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <AiOutlineClose className="x-sidebar" />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
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
            </nav>
          </IconContext.Provider>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default Sidebar;
