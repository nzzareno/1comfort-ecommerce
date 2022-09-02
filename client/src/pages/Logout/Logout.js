import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ auth, setAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/auth/logout").then((res) => {
      if (auth) {
        setAuth(false);
        navigate("/signin");
      }
    });
  }, []);
  return <></>;
};

export default Logout;
