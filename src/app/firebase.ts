// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUDXn0ympH2iaY9vzu_79yMdcS8wYw09o",
  authDomain: "media-app-g.firebaseapp.com",
  projectId: "media-app-g",
  storageBucket: "media-app-g.appspot.com",
  messagingSenderId: "134965322289",
  appId: "1:134965322289:web:f2ab5e669af5eaafecab10",
  measurementId: "G-JJZ9PB8M3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app