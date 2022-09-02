import React, { useContext, useEffect } from "react";
import Home from "./pages/Home/Home";
import ProductForm from "./pages/ProductForm/ProductForm";
import NotFound404 from "./pages/NotFound/NotFound404";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";
import Accessories from "./pages/Accessories/Accessories";
import Tshirts from "./pages/T-Shirts/Tshirts";
import Footwear from "./pages/Footwear/Footwear";
import Men from "./pages/Men/Men";
import Women from "./pages/Women/Women";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { ContextOfProduct } from "./context/ProductContext";
import Logout from "./pages/Logout/Logout";

const App = () => {
  //const { users, auth, setAuth } = useContext(ContextOfProduct);

  let { auth, setAuth } = useContext(ContextOfProduct);

  return (
    <div className="App">
      <Navbar className="original-nav" />
      <Sidebar id="small-nav" auth={auth} setAuth={setAuth} />

      <Routes>
        <Route
          path="/"
          element={auth ? <Home /> : <Navigate to="/signin" replace />}
        />
        <Route path="/make-product" element={<ProductForm />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/footwear" element={<Footwear />} />
        <Route path="/tshirts" element={<Tshirts />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/signin" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound404 />} />
        <Route
          path="/auth/logout"
          element={<Logout auth={auth} setAuth={setAuth} />}
        />
      </Routes>
    </div>
  );
};

export default App;
