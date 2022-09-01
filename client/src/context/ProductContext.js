import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ContextOfProduct = createContext();

export default function ProductContext({ children }) {
  const [data, setData] = useState([]);
  const [saveData, setSaveData] = useState({});
  const [users, setUsers] = useState({});
  const [auth, setAuth] = useState(false);

  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   () => JSON.parse(localStorage.getItem("auth")) || false
  // );

  // const setAuth = (value) => {
  //   setIsAuthenticated(value);
  //   //alert(value);
  // };

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/getDetails")
      .then(({ data: { nombre, age, avatar, phone, address } }) => {
        setUsers({
          nombre,
          age,
          avatar,
          phone,
          address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/productos");
      setData(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    data.map(async (item) => {
      const { id } = await item;
      setSaveData(id);
    });
  }, [data]);

  console.log(users);

  return (
    <ContextOfProduct.Provider value={{ data, saveData, users, auth, setAuth }}>
      {children}
    </ContextOfProduct.Provider>
  );
}
