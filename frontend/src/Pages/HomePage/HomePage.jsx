import React from 'react'
import "./HomePage.css";
import logo from "../../assets/logo.png";
import {signInWithGoogle} from '../../Firebase'
import {  useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const signin = () => {
    signInWithGoogle().then((res) => {
      console.log(res);
      navigate("/dashboard");
    });
  }

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
          signin
        }>
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" />
        <p>Sign in with Google</p>
        </button>
    </div>
  )
}
