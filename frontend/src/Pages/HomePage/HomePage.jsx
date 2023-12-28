import React from 'react'
import "./HomePage.css";
import logo from "../../assets/logo.svg";
import {signInWithGoogle} from '../../Firebase'

export default function HomePage() {

  return (
    <div>
        <div className="bannerImg">
        <img src={logo} alt="" />
        </div>
        <div className="headline">
        </div>
        {/* google signin */}
        <br />
        <br />
        <br />
        <button className="googleSignin" onClick={
          signInWithGoogle
        }>
        <img src="https://img.icons8.com/color/48/000000/google-logo.svg" alt="" />
        <p>Sign in with Google</p>
        </button>
    </div>
  )
}
