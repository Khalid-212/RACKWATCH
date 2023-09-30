import React from 'react'
import "./Header.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import { Link } from 'react-router-dom';

function Header() {
  const user = localStorage.getItem('user');
  console.log(JSON.parse(user))
  return (
    <div className='header'>
            <Link to="/home" style={{ textDecoration: "none" }}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
        </Link>
      <div className="avatar">
        <img src={avatar} alt="user" />
        <p>{user.displayName}</p>
      </div>
    </div>
  )
}

export default Header
