import React from "react";
import "./EditPopUp.scss";
 

const EditPopUp = ({ children, trigger, setTrigger }) => {
  return trigger ? (
    <div className="edit-popup">
      <div className="popup-linner">
        <button className="close-btn" onClick={() => setTrigger(false)}>
          X
        </button>
        <h2>Colocar los inputs editables</h2>
        {children}
      </div>
    </div>
  ) : null;
};

export default EditPopUp;
