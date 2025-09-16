// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhhFWFpaGY9sDk4yrzilk5eld54Fi-kDk",
  authDomain: "duoplay-e92c1.firebaseapp.com",
  projectId: "duoplay-e92c1",
  storageBucket: "duoplay-e92c1.firebasestorage.app",
  messagingSenderId: "429375425776",
  appId: "1:429375425776:web:5e43450d8b868cee9c4635",
  measurementId: "G-H80WKCCE5V"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// (Optional) Analytics — works only in browsers
const analytics = getAnalytics(app);

// ✅ Initialize Firestore DB
export const db = getFirestore(app);
