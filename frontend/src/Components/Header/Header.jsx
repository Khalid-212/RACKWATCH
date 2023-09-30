import React from 'react'
import "./Header.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

function Header() {
  return (
    <div className='header'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="avatar">
        <img src={avatar} alt="user" />
      </div>
    </div>
  )
}

export default Header
