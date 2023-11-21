// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7eFLTsSP8AZbDgc5SudoKGsKwmOkfRbA",
  authDomain: "bee-candle-database.firebaseapp.com",
  projectId: "bee-candle-database",
  storageBucket: "bee-candle-database.appspot.com",
  messagingSenderId: "1007945367348",
  appId: "1:1007945367348:web:42ef933588c77759256f61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireStoreInit = () => app