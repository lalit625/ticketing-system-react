import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyBunAH5WWF9PO2mcaUaUD2N4IcPXJmC_ZA",
    authDomain: "chc-ticket-sytem.firebaseapp.com",
    projectId: "chc-ticket-sytem",
    storageBucket: "chc-ticket-sytem.appspot.com",
    messagingSenderId: "925022986605",
    appId: "1:925022986605:web:0f902b29edb98c159c7a64"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;