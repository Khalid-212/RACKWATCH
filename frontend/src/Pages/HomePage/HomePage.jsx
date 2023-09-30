import React from 'react'
import "./HomePage.css";
import logo from "../../assets/logo.png";
import {signInWithGoogle} from '../../Firebase'

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
        <br />
        <br />
        <br />
        <button className="googleSignin" onClick={
          signInWithGoogle
        }>
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" />
        <p>Sign in with Google</p>
        </button>
    </div>
  )
}
