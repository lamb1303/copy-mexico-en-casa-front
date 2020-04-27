import app from 'firebase/app';
import 'firebase/storage'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: "mexico-casa.firebaseapp.com",
    databaseURL: "https://mexico-casa.firebaseio.com",
    projectId: "mexico-casa",
    storageBucket: "mexico-casa.appspot.com",
    messagingSenderId: "164769606702",
    appId: "1:164769606702:web:b04b38b3df19e0bb6783bf"
};
console.log(process.env.REACT_APP_FB_API_KEY);

app.initializeApp(firebaseConfig);
const storage = app.storage(); //.ref().child(path).put(img)
const firestore = app.firestore(); //.collection()
// const auth = app.auth(); //.createUsr

export default { storage, firestore };
