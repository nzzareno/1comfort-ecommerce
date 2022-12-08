import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ContextOfProduct = createContext();

export default function ProductContext({ children }) {
  const [data, setData] = useState([]);
  const [foot, setFoot] = useState(false);
  const [saveData, setSaveData] = useState({});
  const [users, setUsers] = useState(null);
  const [auth, setAuth] = useState(false);
  const [carroData, setCarroData] = useState([]);
  const [productosCarro, setProductosCarro] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);
  const [productoSend, setProductoSend] = useState([]);
  const [it, setIt] = useState(0);
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState([]);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [googleUser, setGoogleUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [categories, setCategories] = useState([]);
  const [backError, setBackError] = useState(null);
  const [backRegisterError, setBackRegisterError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      gettingUser();
    }
    const tokenGoogle = googleUser?.token;
    setGoogleUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  async function gettingUser() {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      const resp = await axios.get("/api/auth", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      setUsers(resp.data);
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  }

  useEffect(() => {
    axios
      .get("/api/orders")
      .then(({ data }) => {
        setOrder(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(async () => {
    await axios
      .get("/api/productos")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("/api/carrito")
      .then((res) => {
        setCarroData(res.data);
        res.data.map((i) => setProductosCarro(i.products));
      })
      .catch((err) => console.log(err));
  }, []);

  const logIn = async (user) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(user);
    try {
      const resp = await axios.post("/api/auth", body, config);
      setIsSignedIn(true);
      localStorage.setItem("token", JSON.stringify(resp.data));
      await gettingUser();
      setAuth(true);
    } catch (err) {
      setBackError(err.response.data.message);
    }
  };

  const register = async (user) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(user);
    try {
      await axios.post("/api/users", body, config);
      setIsSignedUp(true);
      await gettingUser();
      setAuth(true);
    } catch (err) {
      setIsSignedUp(false);
      console.log(err.response.data.message);
      setBackRegisterError(err.response.data.message);
    }
  };

  async function addProductsToCart() {
    JSON.parse(localStorage.getItem("products")).map((p) => {
      return [{ ...p }];
    });
    await axios({
      method: "POST",
      url: "/api/carrito",
      data: {
        products: JSON.parse(localStorage.getItem("products")),
        users: users,
      },
    });
  }

  const handlerStock = async (id) => {
    const product = JSON.parse(localStorage.getItem("products")).find(
      (p) => p._id === id.toString()
    );
    const newQuantity = product.quantity;
    const newStock = product.stock - newQuantity;

    if (newStock < newQuantity) {
      alert("No hay stock suficiente");
    } else {
      await axios({
        method: "PATCH",
        url: `/api/productos/${id}`,
        data: {
          stock: newStock,
          quantity: newQuantity,
        },
      });

      const newProducts = data.map((p) => {
        if (p._id === id.toString()) {
          return { ...p, stock: newStock, quantity: newQuantity };
        }
        return p;
      });

      setData(newProducts);
    }
  };

  async function addCartOrder() {
    await axios({
      method: "POST",
      url: "/api/orders",
      data: {
        user: users._id,
        status: "generated",
        products: productoSend,
        numOrder: Math.floor(Math.random() * 1000000000),
        date: dateFormatter(new Date()),
        total: productoSend.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        qtyProducts: productoSend.reduce((acc, item) => acc + item.quantity, 0),
        email: users.email,
        currency_type: "USD",
      },
    })
      .then(() => {
        setProductoSend([]);

        setCartNumber(0);
      })
      .catch((err) => console.log(err));
  }

  const changeBackground = () => {
    if (window.scrollY >= 101) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const dateFormatter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  function increaseCartNumber(id_product) {
    const prod = data.find((item) => item._id === id_product);
    const newProd = [...productoSend, prod];
    setProductoSend(newProd);
  }

  const cartQuantity = carroData.reduce((quantity, item) => {
    item.qtyProducts = item.products.length;
    return quantity + item.qtyProducts;
  }, 0);

  const removeFromCart = async (id) => {
    if (
      JSON.parse(localStorage.getItem("products")).length === 0 ||
      localStorage.getItem("products").length === 0
    ) {
      localStorage.removeItem("products");
    }
    setProductoSend(
      productoSend.filter((item) => {
        return item._id !== id;
      })
    );
  };

  function removeAllFromCart() {
    setProductoSend([]);
  }

  function addProductToLocalStorage(product, quantity) {
    let products = [];
    if (localStorage.getItem("products") === null) {
      products.push({ ...product, quantity });
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      products = JSON.parse(localStorage.getItem("products"));
      const itemExists = products.find((item) => item._id === product._id);
      if (itemExists) {
        itemExists.quantity = itemExists.quantity + quantity;
        localStorage.setItem("products", JSON.stringify(products));
      } else {
        products.push({ ...product, quantity });
        localStorage.setItem("products", JSON.stringify(products));
      }
    }
  }

  function getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("products"));
  }

  function removeProductFromLocalStorage(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    products = products.filter((product) => product._id !== id);
    if (JSON.parse(localStorage.getItem("products")).length === 0) {
      localStorage.removeItem("products");
    } else {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }

  function removeAllProductsFromLocalStorage() {
    localStorage.removeItem("products");
  }

  async function filterProductsByCategory(category) {
    const response = await axios.get(`/api/productos/category/${category}`);
    setCategories(response.data);
  }

  return (
    <ContextOfProduct.Provider
      value={{
        data,
        saveData,
        users,
        auth,
        setAuth,
        setProductoSend,
        removeFromCart,
        carroData,
        cartQuantity,
        productosCarro,
        increaseCartNumber,
        cartNumber,
        productoSend,
        addProductsToCart,
        it,
        setIt,
        changeBackground,
        show,
        setShow,
        addCartOrder,
        order,
        setOrder,
        removeAllFromCart,
        addProductToLocalStorage,
        getProductsFromLocalStorage,
        removeProductFromLocalStorage,
        removeAllProductsFromLocalStorage,
        register,
        logIn,
        setIsSignedIn,
        isSignedIn,
        googleUser,
        setGoogleUser,
        handlerStock,
        foot,
        setFoot,
        filterProductsByCategory,
        categories,
        setCategories,
        backError,
        setBackError,
        setBackRegisterError,
        backRegisterError,
        isSignedUp,
        setIsSignedUp,
    
      }}
    >
      {children}
    </ContextOfProduct.Provider>
  );
}
