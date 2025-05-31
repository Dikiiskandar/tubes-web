import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDXwBETsd5OZUlWrm8pehF5hAgwxTvgfKQ",
    authDomain: "fooddeleveryaza.firebaseapp.com",
    projectId: "fooddeleveryaza",
    storageBucket: "fooddeleveryaza.firebasestorage.app",
    messagingSenderId: "11222446929",
    appId: "1:11222446929:web:96769c813f09ce158ad970",
    measurementId: "G-5B0ZJTL0PM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
