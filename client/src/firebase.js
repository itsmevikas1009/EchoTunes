
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: "blog-26eb9.firebaseapp.com",
//     projectId: "blog-26eb9",
//     storageBucket: "blog-26eb9.appspot.com",
//     messagingSenderId: "134761218625",
//     appId: "1:134761218625:web:974b39697bdd36d11efcc0"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
// export default storage;




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

