// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApGswYFpK5orEtoRFcviKp23Udi4yIth0",
  authDomain: "takacorewards.firebaseapp.com",
  projectId: "takacorewards",
  storageBucket: "takacorewards.appspot.com",
  messagingSenderId: "1073100785333",
  appId: "1:1073100785333:web:e0b7e78ade2104b86ba0fc",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
//const storage = getStorage(app);

//enableIndexedDbPersistence(db).catch(function (err) {
//  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
//  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
//  }
//});

export {
  app,
  db, //storage
};
