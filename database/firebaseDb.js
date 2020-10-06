import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDoTz7leTq6RFhKm6N3s1wxqDw18_fTM3w",
    authDomain: "demomobiles-6ba1a.firebaseapp.com",
    databaseURL: "https://demomobiles-6ba1a.firebaseio.com",
    projectId: "demomobiles-6ba1a",
    storageBucket: "demomobiles-6ba1a.appspot.com",
    messagingSenderId: "572496756557",
    appId: "1:572496756557:web:3aba4ee28702f3162e4104"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;