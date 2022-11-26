import React, { useContext, useEffect } from "react";
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
  const { logIn, foot, setFoot } = useContext(ContextOfProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    setFoot(false);
  }, [foot, setFoot]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const navigate = useNavigate();

  if (localStorage.getItem("token") || localStorage.getItem("profile")) {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .trim()
        .required("Required"),
      password: Yup.string().trim().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        await logIn(values);
        navigate("/");
      } catch (err) {
        alert("Invalid email or password");
        console.error(err);
      }
    },
  });

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
          delay: 0.1,
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
            <div>
              {formik.touched.firstname && formik.errors.firstname ? (
                <small className="formik-error">
                  {formik.errors.firstname}
                </small>
              ) : null}
            </div>
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
            {formik.touched.password && formik.errors.password ? (
              <small className="formik-error">{formik.errors.password}</small>
            ) : null}
          </div>

          <div className="form__field">
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
            onError={() => {
              console.error("Login Failed");
            }}
            type="standard"
            theme="filled-dark"
            text="signin"
            ux_mode="popup"
            width="100%"
            height="100%"
            logo_alignment="center"
          />
        </form>
        <div
          style={{
            color: "red",
            margin: "5px 0 12px 0",
          }}
        ></div>
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
