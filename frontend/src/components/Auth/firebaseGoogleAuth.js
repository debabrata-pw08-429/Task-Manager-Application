// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhf3_twwSTheJhfSBFTCIqRuHQTc-Jqkg",
  authDomain: "task-management-app-7d134.firebaseapp.com",
  projectId: "task-management-app-7d134",
  storageBucket: "task-management-app-7d134.appspot.com",
  messagingSenderId: "410151994346",
  appId: "1:410151994346:web:84dc5af8e199b09c0fa893",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export default firebaseApp;
