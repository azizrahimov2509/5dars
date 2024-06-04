// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhv0ELgOY22W4z7OfqdjYt0xa1HyD4ywU",
  authDomain: "fn20-b9d6b.firebaseapp.com",
  projectId: "fn20-b9d6b",
  storageBucket: "fn20-b9d6b.appspot.com",
  messagingSenderId: "989359144287",
  appId: "1:989359144287:web:a19dcd123c4dd1585f8aea",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
