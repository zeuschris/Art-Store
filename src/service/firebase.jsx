import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "art-store-df94c.firebaseapp.com",
  projectId: "art-store-df94c",
  storageBucket: "art-store-df94c.firebasestorage.app",
  messagingSenderId: "745940125190",
  appId: "1:745940125190:web:d807db53fef653ab1ee587"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);