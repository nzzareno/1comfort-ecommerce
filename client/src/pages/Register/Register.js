import React, { useState, useContext, useEffect } from "react";
import "./Register.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaAddressCard,
  FaInfoCircle,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { IoArrowRedo } from "react-icons/io5";
import { ContextOfProduct } from "../../context/MyContext";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

const Register = () => {
  const [data, setData] = useState({});
  const {
    register,
    foot,
    setFoot,
    backRegisterError,
    setBackRegisterError,
    isSignedUp,
    setIsSignedUp,
  } = useContext(ContextOfProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFoot(false);
  }, [foot, setFoot]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (localStorage.getItem("token") || localStorage.getItem("profile")) {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .trim()
        .required("Email is required"),
      password: Yup.string()
        .trim()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters"),
      firstname: Yup.string()
        .min(4, "Four letters at least")
        .required("First name is required")
        .trim()
        .matches(/^[aA-zZ\s]+$/, "Is not in correct format"),
      lastname: Yup.string()
        .min(4, "Four letters at least")
        .required("Last name is required")
        .trim()
        .matches(/^[aA-zZ\s]+$/, "Is not in correct format"),
      phone: Yup.string().trim().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await register(values);
        if (isSignedUp) {
          navigate("/signin");
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

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
              autoComplete="firstname"
              type="text"
              name="firstname"
              id="firstname"
              className="form__input"
              placeholder="Name"
              required="required"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
          </div>
          <div style={{ height: "5px" }}>
            {formik.touched.firstname && formik.errors.firstname ? (
              <div
                style={{
                  marginTop: "-10px",
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
                  }}
                >
                  {formik.errors.firstname}
                </p>
              </div>
            ) : null}
          </div>
          <div
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          ></div>
          <div className="form__field">
            <label htmlFor="login__username">
              <svg className="icon">
                <FaAddressCard />
              </svg>
              <span className="hidden">Last name</span>
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="form__input"
              placeholder="Last name"
              required="required"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
          </div>
          <div style={{ height: "5px" }}>
            {formik.touched.lastname && formik.errors.lastname ? (
              <div
                style={{
                  marginTop: "-10px",
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
                  }}
                >
                  {formik.errors.lastname}
                </p>
              </div>
            ) : null}
          </div>
          <div
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "15px",
              fontWeight: "bold",
              margin: 0,
              padding: 0,
            }}
          ></div>
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
              placeholder="Phone"
              required="required"
              className="form__input"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </div>
          <div style={{ height: "5px" }}>
            {formik.touched.phone && formik.errors.phone ? (
              <div
                style={{
                  marginTop: "-10px",
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
                  }}
                >
                  {formik.errors.phone}
                </p>
              </div>
            ) : null}
          </div>
          <div
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "15px",
              fontWeight: "bold",
              margin: 0,
              padding: 0,
            }}
          ></div>
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
              placeholder="Email"
              required="required"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </div>
          <div style={{ height: "5px" }}>
            {formik.touched.email && formik.errors.email ? (
              <div
                style={{
                  marginTop: "-10px",
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
                  }}
                >
                  {formik.errors.email}
                </p>
              </div>
            ) : null}
          </div>
          <div
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "15px",
              fontWeight: "bold",
              margin: 0,
              padding: 0,
            }}
          ></div>
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
              placeholder="Password"
              required="required"
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            <div
              style={{
                textAlign: "center",
                color: "red",
                fontSize: "15px",
                fontWeight: "bold",
                margin: 0,
                padding: 0,
              }}
            ></div>
          </div>
          <div style={{ height: "14px" }}>
            {formik.touched.password && formik.errors.password ? (
              <div
                style={{
                  marginTop: "-10px",
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
                  }}
                >
                  {formik.errors.password}
                </p>
              </div>
            ) : null}
              {backRegisterError && (
              <p
                style={{
                  color: "#ff0000",
                  marginTop: "-9.5px",
                  fontSize: "12px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {backRegisterError}
              </p>
            )}
          </div>
          
          <div className="form__field">
            <input
              onKeyDown={(e) => {
                if (e.key === "13") {
                  formik.handleSubmit();
                }
              }}
              type="submit"
              value="Sign Up"
            />
          </div>

          <GoogleLogin
            className="loginBtn loginBtn--google"
            onSuccess={(credentialResponse) => {
              const client = credentialResponse?.clientId;
              const token = credentialResponse?.credential;

              const user = jwt_decode(token);
              console.log(user);

              try {
                dispatch({ type: "AUTH", data: { client, token, user } });
                navigate("/");
              } catch (error) {
                console.log(error);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            type="standard"
            theme="filled_blue"
            text="signin"
            ux_mode="popup"
            size="large"
            shape="square"
            width="100%"
            height="100%"
            logo_alignment="center"
          />
        </form>

        <p className="text--center">
          Already have a account ?{" "}
          <Link to="/signin">
            {" "}
            <br /> Sign in now{" "}
          </Link>
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
