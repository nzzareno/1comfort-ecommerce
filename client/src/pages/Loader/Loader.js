import React from "react";
import "./Loader.scss";
import { Dna } from "react-loader-spinner";

const Loader = () => {
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
