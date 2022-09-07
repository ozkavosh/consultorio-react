// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW7mV-8O9Iq2H9mP78zKi7YfffpG9AhbA",
  authDomain: "consultorio-dfe69.firebaseapp.com",
  projectId: "consultorio-dfe69",
  storageBucket: "consultorio-dfe69.appspot.com",
  messagingSenderId: "726499782478",
  appId: "1:726499782478:web:0bcb7c17932f410cd6781f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirebaseApp = () => {
  return app;
};