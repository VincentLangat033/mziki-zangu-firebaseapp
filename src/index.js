import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc

} from 'firebase/firestore'

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


//  Initialize Firestore services
const db = getFirestore()


//  get a reference to a specific collection in our database
const colRef = collection( db, 'songs')


// get collection data
getDocs(colRef)
 .then((snapshot)=>{
    console.log(snapshot.docs)
    let songs = []
    snapshot.docs.forEach((doc)=>{
        songs.push({
            ...doc.data(), id: doc.id
        })
    }) 
console.log(songs)
 })
 .catch(err =>{
    console.log(err.message)
 })


//  Adding songs
const addSongForm = document.querySelector('.add')
addSongForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    addDoc(colRef, {
        title: addSongForm.title.value,
        artist: addSongForm.artist.value,
    })
    .then(()=>{
        addSongForm.reset()

    })
})

// deleting a song
const deleteSongForm = document.querySelector('.delete')
deleteSongForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const docRef = doc(db, 'songs', deleteSongForm.id.value)
    deleteDoc(docRef)
     .then(()=>{

        deleteSongForm.reset()
        
     })

})