import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-kAa27PF2pr8rL8zVbkGbNVwutxGSPyY",
  authDomain: "openai-ruralad.firebaseapp.com",
  projectId: "openai-ruralad",
  storageBucket: "openai-ruralad.appspot.com",
  messagingSenderId: "870147816704",
  appId: "1:870147816704:web:492dbe6233a82a892c07e5",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
