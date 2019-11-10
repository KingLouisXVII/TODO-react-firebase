import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCuQ4OEsMvfusSyP-HfxTvPh8V2tGadegE",
  authDomain: "todo-7c29f.firebaseapp.com",
  databaseURL: "https://todo-7c29f.firebaseio.com",
  projectId: "todo-7c29f",
  storageBucket: "todo-7c29f.appspot.com",
  messagingSenderId: "456699233868",
  appId: "1:456699233868:web:b86f8aaa1563a9e77d56e9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;
