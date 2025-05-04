// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Required for auth

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: "investment-6f46c",
  storageBucket: "investment-6f46c.appspot.com", // ❗ corrected `.app` to `.com`
  messagingSenderId: "361761218036",
  appId: "1:361761218036:web:ae4ccaf19f5c37b4e2ada1",
  measurementId: "G-HWMN25YNK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // ✅ You need this

export default app;
