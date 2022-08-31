import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ContextOfProduct = createContext();

export default function ProductContext({ children }) {
  const [data, setData] = useState([]);
  const [saveData, setSaveData] = useState({});
  const [error, setError] = useState(false);

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

  if (error) {
    setError(true);
  }
  return (
    <ContextOfProduct.Provider value={{ data, saveData }}>
      {children}
    </ContextOfProduct.Provider>
  );
}
