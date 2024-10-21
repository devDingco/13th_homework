// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7UNy2lgz8bM-KyuyTkQsVa3p7AkBgR24',
  authDomain: 'sesac-myapp.firebaseapp.com',
  projectId: 'sesac-myapp',
  storageBucket: 'sesac-myapp.appspot.com',
  messagingSenderId: '536879794744',
  appId: '1:536879794744:web:e41d69d371545b4db974cd',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
