import React from "react";
import "./Card.css";

function Card({ value, attribute, color }) {
  return (
    <div
      className="card"
      style={{
        border: `5px solid ${color}`,
        color: `${color}`,
      }}
    >
      <div className="value">{value}</div>
      <div className="attribute">{attribute}</div>
    </div>
  );
}

export default Card;
