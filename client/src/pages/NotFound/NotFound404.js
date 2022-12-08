import React, { useEffect,useContext } from "react";
import { ContextOfProduct } from "../../context/MyContext";

const NotFound404 = () => {
  let { foot, setFoot } = useContext(ContextOfProduct);

  useEffect(() => {
    setFoot(false);
  }, [foot, setFoot]);
  return (
    <div>
      <h1>NOT FOUND 404!!!</h1>
    </div>
  );
};

export default NotFound404;
