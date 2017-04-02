import Firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyACCOibnAAjzW5xuGD_23auaU-tX5LD9f0",
    authDomain: "realdope-a3087.firebaseapp.com",
    databaseURL: "https://realdope-a3087.firebaseio.com",
    storageBucket: "realdope-a3087.appspot.com",
    messagingSenderId: "858854725050"
};

Firebase.initializeApp(config);

export default Firebase;