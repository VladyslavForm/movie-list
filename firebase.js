import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAaUMeVf6l0nikmNNbvtcgTKh3iEtYkMRc",
  authDomain: "movie-list-56567.firebaseapp.com",
  projectId: "movie-list-56567",
  storageBucket: "movie-list-56567.firebasestorage.app",
  messagingSenderId: "358470634082",
  appId: "1:358470634082:web:e708c71087f808fb479f3b",
  measurementId: "G-1RDL6BQQT9"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
