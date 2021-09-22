import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtHQYGdUX1Nx14SA1t-vgI--AL8Y4EoGw",
  authDomain: "insiten-v2.firebaseapp.com",
  projectId: "insiten-v2",
  storageBucket: "insiten-v2.appspot.com",
  messagingSenderId: "350599695029",
  appId: "1:350599695029:web:27d4d37ada0eb6a0eaccfc",
  measurementId: "G-N1V7MH956L",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
