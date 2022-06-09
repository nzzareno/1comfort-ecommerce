import MenPic from "../../assets/Men.jpg";
import WomenPic from "../../assets/Women.jpg";
import BagsPic from "../../assets/Menjacketpro.jpg";
import FootwearPic from "../../assets/backfoot.jpg";
import HatsPic from "../../assets/Hats.jpg";
import "./MenuItem.scss";
import { Link } from "react-router-dom";

const MenuItem = () => {
  return (
    <div className="homepage">
      <div className="directory-menu">
        <Link to="/accessories" className="menu-item small">
          <div
            className="background-image accesories-image-container"
            style={{
              backgroundImage: `url(${HatsPic})`,
              
            }}
          />
          <div className="content">
            <h1 className="title">ACCESSORIES</h1>
            <span className="subtitle"> & JEWELRY</span>
          </div>
        </Link>

        <Link to="/footwear" className="menu-item small">
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${FootwearPic})`,
            }}
          />
          <div className="content">
            <h1 className="title">FOOTWEAR</h1>
            <span className="subtitle">& STOCKINGS</span>
          </div>
        </Link>

        <Link to="/tshirts" className="menu-item small">
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${BagsPic})`,
            }}
          />
          <div className="content">
            <h1 className="title">T-SHIRTS</h1>
            <span className="subtitle">& JACKETS</span>
          </div>
        </Link>

        <Link to="/men" className="menu-item large">
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${MenPic})`,
            }}
          />
          <div className="content">
            <h1 className="title">MEN</h1>
            <span className="subtitle">SHOP NOW</span>
          </div>
        </Link>

        <Link to="/women" className="menu-item large">
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${WomenPic})`,
            }}
          />
          <div className="content">
            <h1 className="title">WOMEN</h1>
            <span className="subtitle">SHOP NOW</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuItem;
