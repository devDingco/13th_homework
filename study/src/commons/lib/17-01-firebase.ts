// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "codecamp-jomira.firebaseapp.com",
  projectId: "codecamp-jomira",
  storageBucket: "codecamp-jomira.appspot.com",
  messagingSenderId: "792650395274",
  appId: "1:792650395274:web:7234d4dcdfe2160e834773",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
