// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCEtzeA4cvhhIpN1YfAyJ_eToGy312qfV8",
  authDomain: "carnik-873cd.firebaseapp.com",
  projectId: "carnik-873cd",
  storageBucket: "carnik-873cd.appspot.com",
  messagingSenderId: "857222224278",
  appId: "1:857222224278:web:097b2faeb4d8bca3bde5b7",
  measurementId: "G-WEVDL50MXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app