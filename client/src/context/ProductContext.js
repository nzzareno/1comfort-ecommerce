import { createContext, useState, useEffect } from "react";

export const ContextOfProduct = createContext();

export default function ProductContext({ children }) {
  const [data, setData] = useState([]);
  const [saveData, setSaveData] = useState({});
  
  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    data.map(async (item) => {
      const { id } = await item;
      setSaveData(id);
    });
  }, [data]);


  return (
    <ContextOfProduct.Provider value={{ data, saveData }}>
      {children}
    </ContextOfProduct.Provider>
  );
}
