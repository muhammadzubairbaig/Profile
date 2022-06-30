
  import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getStorage} from 'firebase/storage'

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9sVBqZjGFbAVKpMy1zr7fj1MmmH_PDLM",
    authDomain: "profile-71b56.firebaseapp.com",
    projectId: "profile-71b56",
    storageBucket: "profile-71b56.appspot.com",
    messagingSenderId: "860817997113",
    appId: "1:860817997113:web:6964d330b5f393ead5fce8",
    measurementId: "G-8NPKLMC7N9"
  };

export const app=firebase.initializeApp(firebaseConfig)
const db=app.firestore();
const storage=getStorage(app);
export { db,storage }
