import React, { useState, useContext } from "react";
import styles from "./Women.module.scss";
import { ContextOfProduct } from "../../context/ProductContext";
import HeaderPic from "../../assets/womens.jpg";
import axios from "axios";
import { motion } from "framer-motion";
import EditPopUp from "../../components/EditPopUp/EditPopUp";

const Women = () => {
  const [editButton, setEditButton] = useState(false);
  const [deleteSingleData, setDeleteSingleData] = useState({});
  let { data } = useContext(ContextOfProduct);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const deleteSingleProduct = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/productos/${id}`
    );
    const data = await response.data;
    setDeleteSingleData(data);
    alert("Product removed");
  };
  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={variants}
        className={styles.header}
      >
        <h2 className={styles.title}>Womens</h2>
        <img
          src={HeaderPic}
          className={styles.headerImg}
          alt="header-accessories"
        />
      </motion.header>
      <div className={styles.containerProductos}>
        {data.map((item) => {
          return (
            item.genre === "women" && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
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
                          <li onClick={() => setEditButton(true)}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            <span>Edit</span>
                          </li>
                          <EditPopUp
                            trigger={editButton}
                            setTrigger={setEditButton}
                          ></EditPopUp>
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
                          <li onClick={() => deleteSingleProduct(item.id)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            <span>Remove</span>
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
                            {item.price}
                            <span> US$</span>
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
                            {item.date}
                          </small>
                          <h3 className={styles.stock}>Stock: {item.stock}</h3>
                          <button className={styles.btn_product_home}>
                            SHOP NOW
                          </button>
                        </div>
                        <div className={styles.cuotasContainer}>
                          <h4 className={styles.cuotesHome}>
                            Or 6 installments of{" "}
                            {parseFloat(item.price / 6).toFixed(2)} US$
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

export default Women;
