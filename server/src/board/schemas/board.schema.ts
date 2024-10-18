import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBcAdTCkvrgfy00JPQCVJVUez4gBkn4oY8',
    authDomain: 'sesac-e8deb.firebaseapp.com',
    projectId: 'sesac-e8deb',
    storageBucket: 'sesac-e8deb.appspot.com',
    messagingSenderId: '149873087664',
    appId: '1:149873087664:web:12b67ee08a7e896c339775',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
