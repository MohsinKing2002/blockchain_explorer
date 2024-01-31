import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FBApiKey,
  authDomain: "blockchain-exp.firebaseapp.com",
  projectId: "blockchain-exp",
  storageBucket: "blockchain-exp.appspot.com",
  messagingSenderId: "1094584881009",
  appId: process.env.NEXT_PUBLIC_FBAppId,
  measurementId: "G-VCWC22Y0BV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore(app);

export { app, auth, database };
