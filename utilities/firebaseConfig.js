// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9qq9ABAxRwRFU8X-wyR670gmH1Rmm9yk",
  authDomain: "ev-station-d9f6b.firebaseapp.com",
  projectId: "ev-station-d9f6b",
  storageBucket: "ev-station-d9f6b.appspot.com",
  messagingSenderId: "1006635364987",
  appId: "1:1006635364987:web:b24947a12a6bf2c82468de",
  measurementId: "G-N2QYYWBV42",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
