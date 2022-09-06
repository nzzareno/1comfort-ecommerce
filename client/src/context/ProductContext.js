import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ContextOfProduct = createContext();

export default function ProductContext({ children }) {
  const [data, setData] = useState([]);
  const [saveData, setSaveData] = useState({});
  const [users, setUsers] = useState({});
  const [auth, setAuth] = useState(false);
  const [carroData, setCarroData] = useState([]);
  const [productosCarro, setProductosCarro] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);
  const [productoSend, setProductoSend] = useState([]);
  const [it, setIt] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/getDetails")
      .then(({ data: { nombre, age, avatar, phone, address, email } }) => {
        setUsers({
          nombre,
          age,
          avatar,
          phone,
          address,
          email,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/productos").then((res) => {
      setData(res.data);
    });
  }, []);

  // useEffect(() => {
  //   data.map(async (item) => {
  //     const { id } = await item;
  //     setSaveData(id);
  //   });
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/carrito")
      .then((res) => {
        setCarroData(res.data);
        res.data.map((i) => {
          setProductosCarro(i.products);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  async function addProductsToCart() {
    productoSend.map((p) => {
      return [{ ...p }];
    });
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/carrito",
      data: {
        products: productoSend,
        users: users,
      },
    })
      .then(() =>
        setTimeout(() => {
          setProductoSend([]);
        }, 1400)
      )
      .catch((err) => console.log(err));
  }

  const changeBackground = () => {
    if (window.scrollY >= 101) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  function addItem(item, quantity) {
    const itemExist = productoSend.find((i) => i.id === item.id);
    if (itemExist) {
      itemExist.quantity = itemExist.quantity + quantity;
      setProductoSend([...productoSend]);
    } else {
      setProductoSend([...productoSend, { ...item, quantity }]);
    }
  }

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
    setProductoSend((currItems) => currItems.filter((item) => item._id !== id));
  };

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
        addItem,
        it,
        setIt,
        changeBackground,
        show,
        setShow,
      }}
    >
      {children}
    </ContextOfProduct.Provider>
  );
}
