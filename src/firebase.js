// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8swoIgYRIGH8t2tG9c2eFmajOKTWqbiE",
  authDomain: "watch-pickr.firebaseapp.com",
  projectId: "watch-pickr",
  storageBucket: "watch-pickr.appspot.com",
  messagingSenderId: "850608888437",
  appId: "1:850608888437:web:8cf630a0385540cdf0f63c",
  measurementId: "G-8TY7HTJKGB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
