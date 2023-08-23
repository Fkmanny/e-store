// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyA44r-v6mRr8bTJxRIugQQup012uyRCj-I",
  authDomain: "e-store-7af1e.firebaseapp.com",
  projectId: "e-store-7af1e",
  storageBucket: "e-store-7af1e.appspot.com",
  messagingSenderId: "541932872957",
  appId: "1:541932872957:web:d96b1184f8c3896e480a94",
  measurementId: "G-9T77017X5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app