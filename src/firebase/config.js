import app from 'firebase/app';
import 'firebase/storage'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: "catalogocovid2020.firebaseapp.com",
    databaseURL: "https://catalogocovid2020.firebaseio.com",
    projectId: "catalogocovid2020",
    storageBucket: "catalogocovid2020.appspot.com",
    messagingSenderId: "1030415722995",
    appId: "1:1030415722995:web:b62bf0ba6bc4c373094a86"
};

app.initializeApp(firebaseConfig);
const storage = app.storage(); //.ref().child(path).put(img)
const firestore = app.firestore(); //.collection()
// const auth = app.auth(); //.createUsr

export default { storage, firestore };
