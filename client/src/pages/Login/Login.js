import React, { useState, useEffect, useContext } from "react";
import "./Login.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ContextOfProduct } from "../../context/ProductContext";

const Login = ({ setAuth }) => {
  const [data, setData] = useState({});
  // let { auth, setAuth } = useContext(ContextOfProduct);

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
      // await axios
      //   .post("http://localhost:8080/auth/login", {
      //     email: values.email,
      //     password: values.password,
      //   })
      //   .then((res) => {
      //     // window.localStorage.setItem("isAuthenticated", true);
      //     if (res.status === 200) {
      //       setData({
      //         success: true,
      //         error: false,
      //         data: res.data,
      //       });
      //       console.log(res)
      //       navigate("/");
      //     } else {
      //       navigate("/signup");
      //       console.log("error en el registro");
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setData({ error: err.message, success: false });
      //   });

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
            console.log(res);
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="product__form-body"
    >
      <div className="capa-form">
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your email"
            required="required"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <small style={{ color: "red" }}>{formik.errors.email}</small>
          ) : null}
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            placeholder="Your password"
            required="required"
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <small style={{ color: "red" }}>{formik.errors.password}</small>
          ) : null}
          <div
            style={{
              color: "red",
              margin: "5px 0 12px 0",
            }}
          >
            {" "}
            {success && "You are login successful"}
            {error && "Your email or password is incorrect"}
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-large">
            Let me in.
          </button>
          <p className="mt-2">
            Don’t have an account? Sign up! <Link to={"/signup"}>Register</Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
