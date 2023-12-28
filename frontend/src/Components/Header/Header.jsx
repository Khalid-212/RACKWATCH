import React from 'react'
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { Link } from 'react-router-dom';

function Header() {
  const userImg = localStorage.getItem("photo");
  // console.log('userImg', userImg)
  const userName = localStorage.getItem("name");
  return (
    <div className='header'>
            <Link to="/home" style={{ textDecoration: "none" }}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
        </Link>
        <div className="flex">

      <div className="avatar">
        <img src={userImg} alt="user" />
        <p>{userName}</p>
      </div>
        </div>
    </div>
  )
}

export default Header
