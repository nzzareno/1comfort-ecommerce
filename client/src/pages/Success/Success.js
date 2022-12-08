import React, { useEffect, useContext } from "react";
import { ContextOfProduct } from "../../context/MyContext";
import {motion} from 'framer-motion'
import "./Success.scss";

const Success = () => {
  const { foot, setFoot, setShow, show } = useContext(ContextOfProduct);
  useEffect(() => {
    setFoot(false);
  }, [foot, setFoot]);

  useEffect(() => {
    setShow(true);
  }, [show, setShow]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
  <motion.div variants={variants} initial="hidden" animate="visible" className="container-success">
      <div className="actionS">
        <div className="trophy">
          <svg fill="#FFD600" width="100%" height="100%" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
          </svg>
        </div>
        <div className="confetti"></div>
        <div className="confetti two"></div>
        <div className="confetti three"></div>
        <div className="confetti four"></div>
        <div className="confetti--purple"></div>
        <div className="confetti--purple two"></div>
        <div className="confetti--purple three"></div>
        <div className="confetti--purple four"></div>.
      </div>
      <div className="txt-success">
        <div className="children-success">
          <h1>
            <span className="success">
              Your purchase has been pleasantly successful.
            </span>
          </h1>
        </div>
        <div className="children-success">
          <span className="success2">
            you can check your email to see the order details of the products
            that you have requested.
          </span>
        </div>
      </div>
      <div className="hope">
        <span>Thank you for your purchase. We hope to see you again soon.</span>
      </div>
    </motion.div>
  );
};

export default Success;
