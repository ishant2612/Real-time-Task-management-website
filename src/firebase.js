// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOeV8Lv_Zg2Yp42EP_nqRelHz6yQ5b4gY",
  authDomain: "task-management-6cd49.firebaseapp.com",
  projectId: "task-management-6cd49",
  storageBucket: "task-management-6cd49.appspot.com",
  messagingSenderId: "212750424492",
  appId: "1:212750424492:web:2a91d2dd915df76f9c8209",
  measurementId: "G-GLNKLRL935",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const getUserByEmail = async (email) => {
  const usersCollection = collection(firestore, "users");
  const userQuery = await getDoc(doc(usersCollection, email));

  if (userQuery.exists()) {
    return userQuery.data();
  } else {
    return null;
  }
};

export const resetpassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};
export const emailveri = (email) => {
  return sendEmailVerification(auth, email);
};
export const firestore = getFirestore(app);
export const auth = getAuth();
export default app;
