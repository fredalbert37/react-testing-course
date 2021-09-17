// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuoloicTrEKLIcsS37pvNxxxLwa6Cts6k",
  authDomain: "udemy-curso-react-78647.firebaseapp.com",
  projectId: "udemy-curso-react-78647",
  storageBucket: "udemy-curso-react-78647.appspot.com",
  messagingSenderId: "344019387670",
  appId: "1:344019387670:web:43e388232102801bc0fc37"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();