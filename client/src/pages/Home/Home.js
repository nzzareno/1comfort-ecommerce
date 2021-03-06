import React, { useState, useEffect, useContext } from "react";
import "./Home.scss";
import EditPopUp from "../../components/EditPopUp/EditPopUp";
import MenuItem from "../../components/Menu-Item/MenuItem";
import axios from "axios";
import { motion } from "framer-motion";
import { ContextOfProduct } from "../../context/ProductContext";
import Slider from "react-slick";
import Bags from "../../assets/Bags.jpg";
import MenPanoram from "../../assets/fondomenpanoram.jpg";
import Men from "../../assets/fondomen.jpg";
import BlondeGirl from "../../assets/fondoblonde.jpg";
import GirlsFriends from "../../assets//fondofriends.jpg";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  const [data, setData] = useState([]);
  const [deleteSingleData, setDeleteSingleData] = useState({});
  const [editButton, setEditButton] = useState(true);
  let { saveData } = useContext(ContextOfProduct);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  console.log(data);
  const deleteSingleProduct = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/productos/${id}`
    );
    const data = await response.data;
    setDeleteSingleData(data);
    alert("Product removed");
  };

  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1250,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let settingsV2 = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    pauseOnFocus: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1815,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,

          dots: true,
        },
      },
      {
        breakpoint: 1390,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          fade: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        },
      },
    ],
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="slider"
      >
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <Slider {...settings}>
            <div>
              <img src={MenPanoram} className="section-1" alt="222" />
            </div>
            <div>
              <img src={BlondeGirl} className="section-1" alt="222" />
            </div>
            <div>
              <img src={Men} className="section-1" alt="222" />
            </div>
            <div>
              <img src={GirlsFriends} className="section-1" alt="222" />
            </div>
            <div>
              <img src={Bags} className="section-1" alt="222" />
            </div>
          </Slider>
        </motion.div>
      </motion.div>

      <div className="pic-container"></div>
      <h3 className="home-title txt anim-text-flow">NEW ARRIVALS </h3>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="bodyHome"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="container"
        >
          <Slider {...settingsV2}>
            {!data
              ? "Loading..."
              : data.map((item) => (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    key={item._id || item.id}
                    className="card"
                  >
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={variants}
                      key={item._id || item.id}
                    >
                      <div className="imgBx">
                        <img className="imagez" src={item.image} alt="imagex" />
                        <ul className="action">
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

                      <div className="content">
                        <div className="productName">
                          <h3>{item.title}</h3>
                        </div>

                        <div
                          className="price_rating"
                          style={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h2 className="precio">
                            {item.price}
                            <span> US$</span>
                          </h2>

                          <img
                            className="logo-img"
                            src={item.logo}
                            alt="logox"
                          />
                          <small
                            className="code-small"
                            style={{ fontWeight: "lighter" }}
                          >
                            {item.code}
                          </small>
                          <small
                            className="date-small"
                            style={{ fontWeight: "lighter" }}
                          >
                            {item.date}
                          </small>
                          <h3 className="stock">Stock: {item.stock}</h3>
                          <button className="btn-product-home">SHOP NOW</button>
                        </div>
                        <div className="cuotas_container">
                          <h4 className="cuotes-home">
                            Or 6 installments of{" "}
                            {parseFloat(item.price / 6).toFixed(2)} US$
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
          </Slider>
        </motion.div>
      </motion.div>
      <MenuItem />
    </>
  );
};

export default Home;
