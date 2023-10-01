import React from 'react'
import img404 from "../assets/404.svg";
import { Link } from 'react-router-dom';

function Pagenotfound() {
  return (
    <div>
      <img src={img404} style={
        {
          width: "50%",
          margin: "auto",
          display: "grid",
          marginTop: "5%",
          placeItems: "center",
          alignItems: "center"
        }
      } alt="" />
      <Link to="/home" style={{ textDecoration: "none" }}>
        <button className="btnAdd">Go to Home</button>
      </Link>
    </div>
  )
}

export default Pagenotfound;