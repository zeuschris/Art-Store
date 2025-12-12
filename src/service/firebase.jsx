import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


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