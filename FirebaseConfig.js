import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBdgxSBUVl4lIu-_ia4QKTw3E5aedNQQlw",
  authDomain: "blog-c780f.firebaseapp.com",
  projectId: "blog-c780f",
  storageBucket: "blog-c780f.appspot.com",
  messagingSenderId: "236800769151",
  appId: "1:236800769151:web:189d97371556ff467cd34a",
  measurementId: "G-5Z8L6PV5B4",
};

// Initialize Firebase

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = initializeAuth(FirebaseApp);

export const db = getFirestore(FirebaseApp);
// const analytics = getAnalytics(FirebaseApp);
