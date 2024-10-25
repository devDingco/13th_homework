// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "trip-de0e5.firebaseapp.com",
  projectId: "trip-de0e5",
  storageBucket: "trip-de0e5.appspot.com",
  messagingSenderId: "508376235861",
  appId: "1:508376235861:web:5865b402cb19e8f44af9dc",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
