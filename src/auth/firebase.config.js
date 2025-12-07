// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrqv6Rq0FmUh7NHtHgChtOIvVpE0d1muw",
  authDomain: "elventh-assignment.firebaseapp.com",
  projectId: "elventh-assignment",
  storageBucket: "elventh-assignment.firebasestorage.app",
  messagingSenderId: "713344693424",
  appId: "1:713344693424:web:507ed1397c7c62eb7fb775"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
export default app;
