import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJ_RjjUlFtWTL0NhjDBebCsfDPKZxOiz8",
  authDomain: "invoice-app-vuejs-91434.firebaseapp.com",
  projectId: "invoice-app-vuejs-91434",
  storageBucket: "invoice-app-vuejs-91434.appspot.com",
  messagingSenderId: "662240501876",
  appId: "1:662240501876:web:8936d83fbaf3fcb9767121"
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };