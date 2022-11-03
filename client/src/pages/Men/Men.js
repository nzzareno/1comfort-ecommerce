import React, { useState, useContext } from "react";
import styles from "./Men.module.scss";
import { ContextOfProduct } from "../../context/ProductContext";
import HeaderPic from "../../assets/mens.jpg";
import axios from "axios";
import { motion } from "framer-motion";
import EditPopUp from "../../components/EditPopUp/EditPopUp";
import { useNavigate } from "react-router-dom";

const Men = () => {
  const [editButton, setEditButton] = useState(false);
  const [deleteSingleData, setDeleteSingleData] = useState({});
  let { data } = useContext(ContextOfProduct);
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const dateFormatter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={variants}
        className={styles.header}
      >
        <h2 className={styles.title}>Mens</h2>
        <img
          src={HeaderPic}
          className={styles.headerImg}
          alt="header-accessories"
        />
      </motion.header>
      <div className={styles.containerProductos}>
        {data.map((item) => {
          return (
            item.genre === "men" && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                key={item._id}
                className={styles.bodyHome}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  className={styles.container}
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    key={item.id}
                    className={styles.card}
                  >
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={variants}
                      key={item.id}
                    >
                      <div className={styles.imgBx}>
                        <img
                          className={styles.imagez}
                          src={item.image}
                          alt="imagex"
                        />
                        <ul className={styles.action}>
                          <li>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                            <span>View Details</span>
                          </li>
                          <li>
                            <i
                              className="fa fa-shopping-cart"
                              aria-hidden="true"
                            ></i>
                            <span>Add to Cart</span>
                          </li>
                        </ul>
                      </div>

                      <div className={styles.content}>
                        <div className={styles.productName}>
                          <h3>{item.title}</h3>
                        </div>

                        <div
                          className={styles.price_rating}
                          style={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h2 className={styles.precio}>
                            <span> $</span>
                            {item.price}
                          </h2>

                          <img
                            className={styles.logoImg}
                            src={item.logo}
                            alt="logox"
                          />
                          <small
                            className={styles.codeSmall}
                            style={{ fontWeight: "lighter" }}
                          >
                            {item.code}
                          </small>
                          <small
                            className={styles.dateSmall}
                            style={{ fontWeight: "lighter" }}
                          >
                            {dateFormatter(item.date)}
                          </small>
                          <h3 className={styles.stock}>Stock: {item.stock}</h3>
                          <button
                            onClick={() => navigate(`/details/${item._id}`)}
                            className={styles.btn_product_home}
                          >
                            SHOP NOW
                          </button>
                        </div>
                        <div className={styles.cuotasContainer}>
                          <h4 className={styles.cuotesHome}>
                            Or 6 installments of $
                            {parseFloat(item.price / 6).toFixed(2)}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          );
        })}
      </div>
    </>
  );
};

export default Men;
