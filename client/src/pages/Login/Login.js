import React, { useContext, useEffect, useState } from "react";
import "./Login.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { IoArrowRedo } from "react-icons/io5";
import { ContextOfProduct } from "../../context/MyContext";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

const Login = () => {
  const { logIn, foot, setFoot, backError, setBackError } =
    useContext(ContextOfProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFoot(false);
  }, [foot, setFoot]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .trim()
        .required("Email is required"),
      password: Yup.string().trim().required(),
    }),

    onSubmit: async (values) => {
      try {
        await logIn(values);
        return;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
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
      className="align-login"
    >
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
        className="grid-login"
      >
        <form onSubmit={formik.handleSubmit} className="form-signin login">
          <div className="form__field-login">
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
          </div>{" "}
          <div style={{ height: "7.4px" }}>
            {formik.touched.email && formik.errors.email ? (
              <div
                style={{
                  marginTop: "-13px",
                  gap: "0px !important",
                }}
                className="error-wrap"
              >
                <p
                  style={{
                    color: "#ff0000",
                    margin: "0",
                    fontSize: "12px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {formik.errors.email}
                </p>
              </div>
            ) : null}
          </div>
          <div className="form__field-login">
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
          </div>
          <div style={{ height: "7px" }}>
            {backError && (
              <p
                style={{
                  color: "#ff0000",
                  marginTop: "-6.5px",
                  fontSize: "12px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {backError}
              </p>
            )}
          </div>
          <div className="form__field-login">
            <input
              onKeyDown={(e) => {
                if (e.key === "13") {
                  formik.handleSubmit();
                }
              }}
              type="submit"
              value="Sign In"
            />
          </div>
          <GoogleLogin
            className="loginBtn loginBtn--google"
            onSuccess={async (credentialResponse) => {
              const client = credentialResponse?.clientId;
              const token = credentialResponse?.credential;

              const user = await jwt_decode(token);

              try {
                dispatch({ type: "AUTH", data: { client, token, user } });
                await axios
                  .post("/api/auth/google", {
                    token,
                    user,
                  })
                  .then(() => {
                    navigate("/");
                  });
              } catch (error) {
                console.log(error);
              }
            }}
            onError={(error) => {
              console.log(error);
            }}
            type="standard"
            theme="filled_blue"
            text="signin"
            ux_mode="popup"
            width="100%"
            height="100%"
            logo_alignment="center"
          />
        </form>

        <p className="text--center">
          Not a member?{" "}
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            to="/signup"
          >
            Sign up now{" "}
            <svg className="icon">
              <IoArrowRedo
                style={{
                  color: "white",
                }}
              />
            </svg>{" "}
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
