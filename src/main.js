import { initializeApp } from 'firebase/app'

import {
    getAuth, createUserWithEmailAndPassword,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAocO5ICpbpe91b9h8MRtXlFE1rHG4Kscc",
    authDomain: "mziki-zangu-firebase-app.firebaseapp.com",
    projectId: "mziki-zangu-firebase-app",
    storageBucket: "mziki-zangu-firebase-app.appspot.com",
    messagingSenderId: "927210747647",
    appId: "1:927210747647:web:d5fcf88cc3c96c27f87eca",
    measurementId: "G-Q9S3XX3WHV"
  };

//    Initialize firebase app
initializeApp(firebaseConfig)
const auth = getAuth()
