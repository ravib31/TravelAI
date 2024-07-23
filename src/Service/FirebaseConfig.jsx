// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYdGLLswiGXS_XzfX8vARfmn8CosRTSOg",
  authDomain: "travel-13aef.firebaseapp.com",
  projectId: "travel-13aef",
  storageBucket: "travel-13aef.appspot.com",
  messagingSenderId: "850526689506",
  appId: "1:850526689506:web:3cada8df6b46b9cb0d26bb",
  measurementId: "G-92F4E58QGK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
