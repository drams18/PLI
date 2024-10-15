import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB44aN0gBQLftbOI_YxTRFePX7QpTMRnrA",
  authDomain: "flawa-8bcc4.firebaseapp.com",
  projectId: "flawa-8bcc4",
  storageBucket: "flawa-8bcc4.appspot.com",
  messagingSenderId: "106158033974",
  appId: "1:106158033974:web:e9b1864038d8776154dc97",
  measurementId: "G-0Y00GW10FX"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
