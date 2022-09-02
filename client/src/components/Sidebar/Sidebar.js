import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import { ContextOfProduct } from "../../context/ProductContext";

const Sidebar = ({ auth, setAuth }) => {
  const [sidebar, setSidebar] = React.useState(false);
  const [disableBtn, setDisableBtn] = React.useState(false);
  // let { auth, setAuth } = useContext(ContextOfProduct);
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
  console.log(auth);
  return (
    <div className="contexto-side">
      <IconContext.Provider value={{ color: " #fff" }}>
        <div className="navbarr">
          <Link to="#" className="menu-bars">
            <FaBars onClick={showSidebar} />
          </Link>
          <Link to="/">
            <h1 className="aside-title">1COMFORT</h1>
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
                  <Link to={auth ? item.pathAuth : item.path}>
                    {item.icon}
                    <span className="span-sidebar">
                      {auth ? item.titleAuth : item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
