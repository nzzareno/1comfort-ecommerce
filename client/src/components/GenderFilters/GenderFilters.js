import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const GenderFilters = ({ setFilteredProducts }) => {
  const [clickedMen, setClickedMen] = useState(false);
  const [clickedWomen, setClickedWomen] = useState(false);

  useEffect(() => {
    filterAll();
  }, [clickedMen, clickedWomen, setFilteredProducts]);

  async function filterCategory(gender) {
    const response = await axios.get(`/api/productos/genre/${gender}`);
    setFilteredProducts(response.data);
  }

  async function filterAll() {
    if (!clickedMen && !clickedWomen) {
      await axios.get("/api/productos").then((res) => {
        setFilteredProducts(res.data);
      });
    }
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="filter-container"
      variants={variants}
      initial={{ x: -900, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
    >
      <li>
        <button
          className={
            clickedMen ? "btn__check-category active" : "btn__check-category"
          }
          onClick={() => {
            setClickedMen(!clickedMen);
            setClickedWomen(false);
            !clickedMen && filterCategory("men");
          }}
        >
          <span>Men</span>
        </button>
      </li>
      <li>
        <button
          className={
            clickedWomen ? "btn__check-category active" : "btn__check-category"
          }
          onClick={() => {
            setClickedWomen(!clickedWomen);
            setClickedMen(false);
            !clickedWomen && filterCategory("women");
          }}
        >
          <span>Women</span>
        </button>
      </li>
    </motion.div>
  );
};

export default GenderFilters;
