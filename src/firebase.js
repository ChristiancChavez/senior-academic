import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyA2OXQ2V-SNgoKhZWP5uLLFxAPIAMuQe1U",
    authDomain: "seniors-academic-839c7.firebaseapp.com",
    databaseURL: "https://seniors-academic-839c7.firebaseio.com",
    projectId: "seniors-academic-839c7",
    storageBucket: "seniors-academic-839c7.appspot.com",
    messagingSenderId: "361716339409"
};

firebase.initializeApp(config);
const storage = firebase.storage();
export {
    storage, firebase as default
}