import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyD-kNpLZBXFsH-fFkoiu_wqX_UPkdf8YEg",
    authDomain: "bookdonate-3c52d.firebaseapp.com",
    databaseURL: "https://bookdonate-3c52d.firebaseio.com",
    projectId: "bookdonate-3c52d",
    storageBucket: "bookdonate-3c52d.appspot.com",
    messagingSenderId: "399978539330",
    appId: "1:399978539330:web:63921567b2b7e91c65c0db"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();