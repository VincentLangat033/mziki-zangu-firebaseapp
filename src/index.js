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
    getAuth,
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


//  Initialize Firestore services
const db = getFirestore()
const auth = getAuth()


//  get a reference to a specific collection in our database
const colRef = collection( db, 'songs')


// // get collection data
// getDocs(colRef)
//  .then((snapshot)=>{
//     console.log(snapshot.docs)
//     let songs = []
//     snapshot.docs.forEach((doc)=>{
//         songs.push({
//             ...doc.data(), id: doc.id
//         })
//     }) 
// console.log(songs)
//  })
//  .catch(err =>{
//     console.log(err.message)
//  })


//  Queries
//where("artist", "==", "Vincent Langat" ),
const q = query(colRef,  orderBy('createdAt'))

onSnapshot(q, (snapshot)=>{
    let songs = []
    snapshot.docs.forEach((doc)=>{
        songs.push({
            ...doc.data(), id: doc.id
        })
    }) 
    console.log(songs)


 })


 //  Real time data collection 
//  onSnapshot(colRef, (snapshot)=>{
//     let songs = []
//     snapshot.docs.forEach((doc)=>{
//         songs.push({
//             ...doc.data(), id: doc.id
//         })
//     }) 
   
//     console.log(songs)
//  })


//  Adding songs
const addSongForm = document.querySelector('.add')
addSongForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    addDoc(colRef, {
        title: addSongForm.title.value,
        artist: addSongForm.artist.value,
        createdAt: serverTimestamp()
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



//  get a single song
const docRef = doc(db, 'songs', '9znSLjOkxtticeH51Tjn')
getDoc(docRef)
 .then((doc)=>{
    console.log(doc.data(), doc.id)
 })

//  get real time data of a single song
 /*
onSnapshot(docRef, (doc)=>
{
    console.log(doc.data(), doc.id)

})
*/

//  Updating a Song
const updateForm = document.getElementsByClassName('updated1')
updateForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log("This field has been traced")


    const docRef = doc(db, 'songs', updateForm.id.value)

    updateDoc(docRef, {
        title: 'Updated title'
    })
    .then(()=>{
        updateForm.reset()

    })

})


