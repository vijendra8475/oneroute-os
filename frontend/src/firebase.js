import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAYylzqtmyMpj7418K919ju5ud-zJEoPXU",
  authDomain: "oneroute-os.firebaseapp.com",
  projectId: "oneroute-os",
  storageBucket: "oneroute-os.firebasestorage.app",
  messagingSenderId: "539003595662",
  appId: "1:539003595662:web:6f9d7c91ffa364934392df"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
