import React, { useState, useEffect } from "react";
import "./CategoryFilter.scss";
import axios from "axios";
import {motion} from 'framer-motion'

const CategoryFilters = ({ setFilteredProducts }) => {
  const [clickedShirt, setClickedShirt] = useState(false);
  const [clickedFootwear, setClickedFootwear] = useState(false);
  const [clickedAccessories, setClickedAccessories] = useState(false);

  useEffect(() => {
    filterAll();
  }, [clickedShirt, clickedFootwear, clickedAccessories, setFilteredProducts]);

  async function filterCategory(category) {
    const response = await axios.get(`/api/productos/category/${category}`);
    setFilteredProducts(response.data);
  }

  async function filterAll() {
    if (!clickedShirt && !clickedFootwear && !clickedAccessories) {
      await axios.get("/api/productos").then((res) => {
        setFilteredProducts(res.data);
      });
    }
  }

  const variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  }

  return (
    <motion.div className="filter-container" variants={variants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.1 }}>
      <li>
        <button
          className={
            clickedShirt ? "btn__check-category active" : "btn__check-category"
          }
          onClick={() => {
            setClickedShirt(!clickedShirt);
            setClickedAccessories(false);
            setClickedFootwear(false);
            !clickedShirt && filterCategory("t-shirts");
          }}
        >
          <span>T-shirts & Divers</span>
        </button>
      </li>
      <li>
        <button
          className={
            clickedFootwear
              ? "btn__check-category active"
              : "btn__check-category"
          }
          onClick={() => {
            setClickedFootwear(!clickedFootwear);
            setClickedShirt(false);
            setClickedAccessories(false);
            !clickedFootwear && filterCategory("footwear");
          }}
        >
          <span>Shoes & Pants</span>
        </button>
      </li>
      <li>
        <button
          className={
            clickedAccessories
              ? "btn__check-category active"
              : "btn__check-category"
          }
          onClick={() => {
            setClickedAccessories(!clickedAccessories);
            setClickedFootwear(false);
            setClickedShirt(false);
            !clickedAccessories && filterCategory("accessories");
          }}
        >
          <span>Accessories</span>
        </button>
      </li>
    </motion.div>
  );
};

export default CategoryFilters;
