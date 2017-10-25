import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBeAbamGzdNtE-7qq4V896cbkxB0zkIA4k",
  authDomain: "my-space-chat.firebaseapp.com",
  databaseURL: "https://my-space-chat.firebaseio.com",
  projectId: "my-space-chat",
  storageBucket: "",
  messagingSenderId: "258992605151"
};

firebase.initializeApp(config);

export default firebase;