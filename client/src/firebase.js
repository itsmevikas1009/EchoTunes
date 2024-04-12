
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDuPUNcKqUk94Gwr0xQV7KlP_BIoJKxX4I",
    authDomain: "spotify-92d44.firebaseapp.com",
    projectId: "spotify-92d44",
    storageBucket: "spotify-92d44.appspot.com",
    messagingSenderId: "309204703063",
    appId: "1:309204703063:web:c8ab7c1772d4f976dd5012",
};


export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

