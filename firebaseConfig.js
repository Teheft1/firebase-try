// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFTj3_hNKLt1a1rCE9o7n7rpi7YeGy9zw",
  authDomain: "try-firebase-48642.firebaseapp.com",
  projectId: "try-firebase-48642",
  storageBucket: "try-firebase-48642.appspot.com",
  messagingSenderId: "669626089589",
  appId: "1:669626089589:web:db700e364c2756b483783c",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
