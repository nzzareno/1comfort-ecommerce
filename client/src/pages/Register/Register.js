import React, { useState, useEffect } from "react";
import "./Register.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaAddressCard,
  FaHandPointRight,
  FaImage,
  FaInfoCircle,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { IoArrowRedo } from "react-icons/io5";

const Register = () => {
  const [data, setData] = useState({});

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      age: "",
      nombre: "",
      address: "",
      phone: "",
      avatar: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Required"),
      password: Yup.string().trim().required("Required"),
      age: Yup.number().required("Required"),
      nombre: Yup.string().trim().required("Required"),
      address: Yup.string().trim().required("Required"),
      phone: Yup.string().trim().required("Required"),
      avatar: Yup.string().trim().required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        url: "http://localhost:8080/auth/register",
        method: "POST",
        data: {
          email: values.email,
          password: values.password,
          age: values.age,
          nombre: values.nombre,
          address: values.address,
          phone: values.phone,
          avatar: values.avatar,
        },
      })
        .then((res) => {
          window.localStorage.setItem("isAuthenticated", true);
          if (res.status === 200) {
            setData({
              success: true,
              error: false,
            });
            navigate("/signin");
          }
        })
        .catch(({ response }) => {
          setData({
            success: false,
            error: response.data.message,
          });
        });
    },
  });

  const { success, error } = data;
  return (
    <div className="align-register">
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 1.5,
        }}
        className="animate-div"
      >
        <h1>One Comfort</h1>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.1,
          duration: 2.7,
        }}
        className="grid-register"
      >
        <form onSubmit={formik.handleSubmit} className="form login">
          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <FaInfoCircle />
              </svg>
              <span className="hidden">Name</span>
            </label>
            <input
              autoComplete="nombre"
              type="text"
              name="nombre"
              id="nombre"
              className="form__input"
              placeholder="Your name"
              required="required"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
            />
          </div>

          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <FaHandPointRight />
              </svg>
              <span className="hidden">Age</span>
            </label>
            <input
              type="number"
              name="age"
              id="age"
              className="form__input"
              placeholder="Your age"
              required="required"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              pattern="[0-9]*"
            />
          </div>

          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <FaAddressCard />
              </svg>
              <span className="hidden">Address</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="form__input"
              placeholder="Your address"
              required="required"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
          </div>
          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <FaImage />
              </svg>
              <span className="hidden">Avatar (URL)</span>
            </label>
            <input
              type="text"
              name="avatar"
              id="avatar"
              className="form__input"
              placeholder="Your avatar"
              required="required"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.avatar}
            />
          </div>
          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <FaPhone />
              </svg>
              <span className="hidden">Phone</span>
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              pattern="\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?"
              placeholder="Your phone"
              required="required"
              className="form__input"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </div>
          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <FaUser />
              </svg>
              <span className="hidden">Email</span>
            </label>
            <input
              autoComplete="email"
              type="text"
              className="form__input"
              name="email"
              id="email"
              placeholder="Your email"
              required="required"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="form__field">
            <label htmlFor="login__password">
              <svg className="icon">
                <FaLock />
              </svg>
              <span className="hidden">Password</span>
            </label>
            <input
              autoComplete="current-password"
              type="password"
              className="form__input"
              name="password"
              id="password"
              onChange={formik.handleChange}
              placeholder="Your password"
              required="required"
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            <div
              style={{
                color: "red",
                margin: "5px 0 12px 0",
              }}
            >
              {success && "You are register successfully"}
              {error && "Something went wrong"}
            </div>
          </div>
          <div className="form__field">
            <input type="submit" value="Sign Up" />
          </div>
        </form>

        <p className="text--center">
          Already have a account ? <Link to="/signin">Sign in now </Link>
          <svg className="icon">
            <IoArrowRedo
              style={{
                color: "white",
              }}
            />
          </svg>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
