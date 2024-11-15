import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyDZyNkaxS8LhW9DR6HcQdDkXzhn9ie238I",
    authDomain: "vanlife-14978.firebaseapp.com",
    projectId: "vanlife-14978",
    storageBucket: "vanlife-14978.firebasestorage.app",
    messagingSenderId: "206528539092",
    appId: "1:206528539092:web:b6d510be179cffbd7cce41"
  }

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }