import firebase from 'firebase'
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAKG0tDZ_ITdUG4A8ShaxNNivSFPiTeTY",
  authDomain: "messageme-3a0c6.firebaseapp.com",
  projectId: "messageme-3a0c6",
  storageBucket: "messageme-3a0c6.appspot.com",
  messagingSenderId: "378265102113",
  appId: "1:378265102113:web:584671323b526e4269c060",
  measurementId: "G-EQ4011B1ZJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth()