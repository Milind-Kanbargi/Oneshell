import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC4ZKKQUk3pIrmGnXw3NOJwlhy9KEv0hoc",
  authDomain: "thestiocs.firebaseapp.com",
  projectId: "thestiocs",
  storageBucket: "thestiocs.appspot.com",
  messagingSenderId: "658949509752",
  appId: "1:658949509752:web:c454938321351e3280138d",
  measurementId: "G-LVD6SQWWDG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth };
