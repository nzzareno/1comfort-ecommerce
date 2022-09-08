import React, { useState, useEffect, useContext } from "react";
import "./Login.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ContextOfProduct } from "../../context/ProductContext";
import { FaUser, FaLock } from "react-icons/fa";
import { IoArrowRedo } from "react-icons/io5";

const Login = () => {
  const [data, setData] = useState({});
  let { auth, setAuth } = useContext(ContextOfProduct);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Required"),
      password: Yup.string().trim().required("Required"),
    }),

    onSubmit: (values) => {
      axios({
        url: "http://localhost:8080/auth/login",
        method: "POST",
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((res) => {
          window.localStorage.setItem("isAuthenticated", true);
          if (res.status === 200) {
            setData({
              success: true,
              error: false,
            });
            setAuth(true);

            navigate("/");
          }
        })
        .catch(({ response }) => {
          console.log(response);
          setData({ error: response.data.message, success: false });
        });
    },
  });
  const { success, error } = data;
  return (
    <div className="align-login">
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
          delay: .1,
          duration: 2.7,
        }}
        className="grid-login"
      >
        <form onSubmit={formik.handleSubmit} className="form login">
          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <FaUser />
              </svg>
              <span className="hidden">Username</span>
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
              {success && "You are login successful"}
              {error && "Your email or password is incorrect"}
            </div>
          </div>
          <div className="form__field">
            <input type="submit" value="Sign In" />
          </div>
        </form>

        <p className="text--center">
          Not a member? <Link to="/signup">Sign up now </Link>
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

export default Login;
