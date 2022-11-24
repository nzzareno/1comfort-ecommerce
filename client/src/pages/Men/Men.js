import React, { useEffect, useContext } from "react";
import styles from "./Men.module.scss";
import { ContextOfProduct } from "../../context/MyContext";
import HeaderPic from "../../assets/mens.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Men = () => {
  let { data, foot, setFoot } = useContext(ContextOfProduct);
  const navigate = useNavigate();

  useEffect(() => {
    setFoot(true)    
   }, [foot, setFoot])

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
