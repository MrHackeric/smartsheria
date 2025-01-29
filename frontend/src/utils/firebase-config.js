// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaf_f_9nHaNZmsRVlDiUR5zHzo-JL9pkU",
  authDomain: "smartsheria.firebaseapp.com",
  projectId: "smartsheria",
  storageBucket: "smartsheria.firebasestorage.app",
  messagingSenderId: "569542569323",
  appId: "1:569542569323:web:3c1a2632568046f54c302e",
  measurementId: "G-7J8TCLDFVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app);


export { db, auth, addDoc, collection, doc, getDoc, updateDoc };
