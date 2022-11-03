import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import NotFound404 from "./pages/NotFound/NotFound404";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Accessories from "./pages/Accessories/Accessories";
import Tshirts from "./pages/T-Shirts/Tshirts";
import Footwear from "./pages/Footwear/Footwear";
import Men from "./pages/Men/Men";
import Women from "./pages/Women/Women";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { ContextOfProduct } from "./context/ProductContext";
import Cart from "./pages/Cart/Cart";
import ProductDetailsContainer from "./pages/ProductDetails/ProductDetailsContainer";
import SvInfo from "./pages/SvInfo/SvInfo";
import Success from "./pages/Success/Success";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Chat from "./pages/Chat/Chat";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  const [googleUser, setGoogleUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const { isSignedIn } = useContext(ContextOfProduct);

  return (
    <GoogleOAuthProvider clientId="1034045335715-rcgadar76fdvc86lu7n8dkj5goh7vbo2.apps.googleusercontent.com">
      <div className="App">
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />

        <Navbar className="original-nav" />
        <Sidebar id="small-nav" />

        <Routes>
          <Route
            path="/"
            element={
              isSignedIn || user || googleUser ? (
                <Home />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/chat"
            element={
              isSignedIn || user || googleUser ? (
                <Chat socket={socket} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/successfull-payment"
            element={
              isSignedIn || user || googleUser ? (
                <Success />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/accessories"
            element={
              isSignedIn || user || googleUser ? (
                <Accessories />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/footwear"
            element={
              isSignedIn || user || googleUser ? (
                <Footwear />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/t-shirts"
            element={
              isSignedIn || user || googleUser ? (
                <Tshirts />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/men"
            element={
              isSignedIn || user || googleUser ? (
                <Men />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/women"
            element={
              isSignedIn || user || googleUser ? (
                <Women />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route path="/info" element={<SvInfo />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/details/:id"
            element={
              isSignedIn || user || googleUser ? (
                <ProductDetailsContainer />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/cart"
            element={
              isSignedIn || user || googleUser ? (
                <Cart />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
