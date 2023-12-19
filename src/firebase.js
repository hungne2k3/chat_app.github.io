import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyApVxwVbzYmph-3g9S7GAevH9towY6CIHE",
//   authDomain: "chat-app-2-d4107.firebaseapp.com",
//   projectId: "chat-app-2-d4107",
//   storageBucket: "chat-app-2-d4107.appspot.com",
//   messagingSenderId: "415956316184",
//   appId: "1:415956316184:web:8ecc3416cede457fb4936d",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCivMpEEatE26KOTMmPnlWUjE_Z5q1e9Zg",
  authDomain: "mess-chat-78442.firebaseapp.com",
  projectId: "mess-chat-78442",
  storageBucket: "mess-chat-78442.appspot.com",
  messagingSenderId: "480706905053",
  appId: "1:480706905053:web:1432c7b896f9f9db2aac34",
  measurementId: "G-W1HMHLC6FL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
