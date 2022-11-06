import React, { useState, useRef, useEffect } from "react";
import "./Footer.scss";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content-container">
          <span className="footer-info2">
            We are a team of talented clothes designers and developers who are
            passionate about creating the best clothes for you.
          </span>
          <span className="footer-info">onecomfort@gmail.com</span>
        </div>
        <div className="footer-menus">
          <div className="footer-content-container">
            <span className="menu-title">
              <h3>Menu</h3>
            </span>
            <a href="#" className="menu-item-footer">
              About us
            </a>
            <a href="#" className="menu-item-footer">
              Brands
            </a>
            <a href="#" className="menu-item-footer">
              References
            </a>
          </div>
          <div className="footer-content-container">
            <span className="menu-title">
              <h3>Help</h3>
            </span>
            <a href="#" className="menu-item-footer">
              Terms & Conditions
            </a>
            <a href="#" className="menu-item-footer">
              Privacy Policy
            </a>
            <a href="#" className="menu-item-footer">
              Refunds
            </a>
          </div>
        </div>

        <div className="footer-content-container">
          <span className="menu-title">
            <h3 className="follow-h3"> Follow us</h3>
          </span>
          <div className="social-container">
            <button className="social-btn">
              <IoLogoFacebook
                className="social-link"
                name="logo-facebook"
              ></IoLogoFacebook>
            </button>
            <button className="social-btn">
              <IoLogoTwitter
                className="social-link"
                name="logo-twitter"
              ></IoLogoTwitter>
            </button>
            <button className="social-btn">
              <IoLogoInstagram
                className="social-link"
                name="logo-instagram"
              ></IoLogoInstagram>
            </button>
            <button className="social-btn">
              <IoLogoYoutube
                className="social-link"
                name="logo-youtube"
              ></IoLogoYoutube>
            </button>
          </div>
        </div>
      </div>
      <div className="copyright-container">
        <span className="copyright">
          Copyright &copy; 2022, ONE COMFORT. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
