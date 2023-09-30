import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth ,signInWithPopup} from 'firebase/auth';
// import { useNavigate } from "react-router-dom";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuv_zFVKOk-_78sxwCLW9v-gOM5ASmUJo",
    authDomain: "rackwatch-c3956.firebaseapp.com",
    projectId: "rackwatch-c3956",
    storageBucket: "rackwatch-c3956.appspot.com",
    messagingSenderId: "989158208168",
    appId: "1:989158208168:web:a85f0358f494a8dc3f089d",
    measurementId: "G-1XRVR5MK1X"
  };

  const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
    export const signInWithGoogle = () => {
    //    const navigate = useNavigate();
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem('user', JSON.stringify(result.user))
        // navigate("/admin/home");
        }).catch((error) => {
            console.log(error.message)
        })
        
    }
