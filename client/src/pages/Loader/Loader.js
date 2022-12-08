import React, { useContext, useEffect } from "react";
import "./Loader.scss";
import { Dna } from "react-loader-spinner";
import { ContextOfProduct } from "../../context/MyContext";

const Loader = () => {
  let { foot, setFoot } = useContext(ContextOfProduct);

  useEffect(() => {
    setFoot(false);
  }, [foot, setFoot]);
  return (
    <div className="container__loader-spinner">
      <div className="absolute-loader">
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
};

export default Loader;
