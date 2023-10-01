import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth ,signInWithPopup} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


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
        signInWithPopup(auth, provider).then((result) => {
            console.log(result)
            const user = result.user;
            localStorage.setItem('name', user.displayName)
            localStorage.setItem('email', user.email)
            localStorage.setItem('photo', user.photoURL)
            window.location.href = "/dashboard";
        }).catch((error) => {
            console.log(error.message)
        })
        
    }
    export const db = getFirestore(app);
