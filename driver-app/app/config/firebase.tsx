import { initializeApp } from "firebase/app";
import { getFirestore ,collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
apiKey: "AIzaSyBD-A7UK_ZlUvw1iikhSdvuwlnPFYNE4kg",
authDomain: "riderapp-fa9e9.firebaseapp.com",
projectId: "riderapp-fa9e9",
storageBucket: "riderapp-fa9e9.appspot.com",
messagingSenderId: "692203280602",
appId: "1:692203280602:web:7e605e75d9b4d23b456de3",
measurementId: "G-DGQESJ8CWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log('Firebase app initialized:', app);

const db = getFirestore(app); 

export {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc, 
    db
}