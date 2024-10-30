// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBxmGvgnT8ks7IXQZ_uP5yWHbtYLhdTpzc",
  authDomain: "test-db082.firebaseapp.com",
  projectId: "test-db082",
  storageBucket: "test-db082.appspot.com",
  messagingSenderId: "630522863288",
  appId: "1:630522863288:web:0b87b709a55e2af8045e4d",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// 여러 군데서 파이어베이스 쓰기 위해서 커먼즈에 넣음.
// 필요한 페이지에 import 해서 써라
