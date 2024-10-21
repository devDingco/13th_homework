// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeZ23_UaPB67eAodDBe5NTzvnXxF3-uOM",
  authDomain: "minitest-1e8ae.firebaseapp.com",
  projectId: "minitest-1e8ae",
  storageBucket: "minitest-1e8ae.appspot.com",
  messagingSenderId: "258425880263",
  appId: "1:258425880263:web:9bc6b370e96b988cb108e2",
};

// Firebase에 접속한다는 뜻
export const firebaseApp = initializeApp(firebaseConfig);
