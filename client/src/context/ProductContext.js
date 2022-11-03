import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ContextOfProduct = createContext();

export default function ProductContext({ children }) {
  const [data, setData] = useState([]);
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
      try {
        const resp = await axios.get("https://one-comfort.herokuapp.com/api/auth", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });

        setUsers(resp.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  }

  useEffect(() => {
    axios
      .get("https://one-comfort.herokuapp.com/api/orders")
      .then(({ data }) => {
        setOrder(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://one-comfort.herokuapp.com/api/productos")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://one-comfort.herokuapp.com/api/carrito")
      .then((res) => {
        setCarroData(res.data);

        const products = carroData.map((p) => p.products);
        setProductosCarro(products);
      })
      .catch((err) => console.log(err));
  }, []);

  const logIn = async (user) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(user);
    try {
      const resp = await axios.post("https://one-comfort.herokuapp.com/api/auth", body, config);
      setIsSignedIn(true);
      localStorage.setItem("token", JSON.stringify(resp.data));
      await gettingUser();
      setAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (user) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(user);
    try {
      await axios.post("https://one-comfort.herokuapp.com/api/users", body, config);
      setIsSignedUp(true);
      await gettingUser();
      setAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  async function addProductsToCart() {
    JSON.parse(localStorage.getItem("products")).map((p) => {
      return [{ ...p }];
    });
    await axios({
      method: "POST",
      url: "https://one-comfort.herokuapp.com/api/carrito",
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
    const newStock = product.stock;
    const newQuantity = product.quantity;
    await axios({
      method: "PATCH",
      url: `https://one-comfort.herokuapp.com/api/productos/${id}`,
      data: {
        stock: newStock,
        quantity: newQuantity,
      },
    });

    const newProducts = data.map((p) => {
      if (p._id === id.toString()) {
        return { ...p, stock: newStock };
      }
      return p;
    });

    setData(newProducts);
  };

  async function addCartOrder() {
    await axios({
      method: "POST",
      url: "https://one-comfort.herokuapp.com/api/orders",
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
      .catch((err) => console.log("OCURRIO UN ERROR", err));
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

  const cartQuantity = productoSend.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

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
      }}
    >
      {children}
    </ContextOfProduct.Provider>
  );
}
