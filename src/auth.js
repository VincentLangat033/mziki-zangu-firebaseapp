// import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy,
    serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'
import {
    getAuth, createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged, signInAnonymously
} from 'firebase/auth'

//  Listen for auth status changes
var config = {
    apiKey: "AIzaSyAocO5ICpbpe91b9h8MRtXlFE1rHG4Kscc",
  authDomain: "mziki-zangu-firebase-app.firebaseapp.com",
  projectId: "mziki-zangu-firebase-app",
  storageBucket: "mziki-zangu-firebase-app.appspot.com",
  messagingSenderId: "927210747647",
  appId: "1:927210747647:web:d5fcf88cc3c96c27f87eca",
  measurementId: "G-Q9S3XX3WHV"
  };
initializeApp(config);
const db = getFirestore()
const auth = getAuth()
  
//   // make auth and firestore references
//   const auth = firebase.auth();
//   const db = firebase.firestore();

//   // update firestore settings
//   db.settings({ timestampsInSnapshots: true });

onAuthStateChanged(auth, (user)=>{
    if (user){
        // get data
db.collection('songs').get()
.then(snapshot =>{
    // console.log(snapshot.docs)
    setupGuides(snapshot.docs);
    setUpUI(user)
});

    }else{
        console.log("User  is logged out")
        setUpUI();
        setupGuides([])
    }
   
})

//  Create new Song

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e)=>{
    e.preventDefault();
})

// Signing user up
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    //Get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //  Sign up the user
    createUserWithEmailAndPassword(auth, email,password)
     .then((cred)=>{
        // console.log(cred)
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();

     })
  
})


// Log out
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();   
    signOut()
     .then(()=>{
        console.log("user is logged out successfully");
     })
} )



//  logging the user in
  

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    //  Get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
        // console.log(cred.user)
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();


    })

})

//  Log in user anonymously
 const btnLogin = document.querySelector('.login-anonymous')
 btnLogin.addEventListener('click', (e)=>{
    e.preventDefault();
    signInAnonymously();
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    window.location.href = "dashboard.html"
 })



//  Log in user using Github


// const github = document.querySelector('.github')
// github.addEventListener('click', (e)=>{
//     e.preventDefault();




// provider.addScope('repo');

// provider.setCustomParameters({
//     'allow_signup': 'false'
//   });


// const authenticate = auth.getAuth();
// const provider = auth.GithubAuthProvider();
// signInWithPopup(authenticate, provider)
//   .then((result) => {
//     // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//     const credential = auth.GithubAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     console.log('So far so great')

//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = auth.GithubAuthProvider.credentialFromError(error);
//     // ...
//   });
// })
