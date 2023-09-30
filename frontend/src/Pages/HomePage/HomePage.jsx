import React from 'react'
import "./HomePage.css";
import logo from "../../assets/logo.png";

export default function HomePage() {
  return (
    <div>
        <div className="bannerImg">
        <img src={logo} alt="" />
        </div>
        <div className="headline">
      <h1>Servers should never be down</h1>
      <p>and we make sure that won’t happen</p>
        </div>
        {/* google signin */}
    </div>
  )
}
