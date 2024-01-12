import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkX4xyunh-juEW7JB5gd7UroNfDuVexrg",
    authDomain: "login-with-c3af2.firebaseapp.com",
    projectId: "login-with-c3af2",
    storageBucket: "login-with-c3af2.appspot.com",
    messagingSenderId: "361018432915",
    appId: "1:361018432915:web:1e642207734354f6e55c66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)