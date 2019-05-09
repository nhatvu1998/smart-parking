const firebase = require("firebase/app");
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyBES961CpMsTu1rjl3f2Dr9e1kUp3GXLzI",
  authDomain: "doan-2953a.firebaseapp.com",
  databaseURL: "https://doan-2953a.firebaseio.com",
  projectId: "doan-2953a",
  storageBucket: "doan-2953a.appspot.com",
  messagingSenderId: "540915823199"
};
firebase.initializeApp(config);

export const db = firebase.firestore();
