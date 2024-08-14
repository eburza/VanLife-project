import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyDWWBSknlHFDOBIANbytJu7q3wlJ4eXTpU",
  authDomain: "vanlife-2613f.firebaseapp.com",
  projectId: "vanlife-2613f",
  storageBucket: "vanlife-2613f.appspot.com",
  messagingSenderId: "936139879237",
  appId: "1:936139879237:web:81d568518d633ed7d3042c"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")
const reviewCollectionRef = collection(db, "reviews")
const transactionCollectionRef = collection(db, "transactions")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id);
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
        throw new Error("Van not found");
    }

    return {
        ...snapshot.data(),
        id: snapshot.id,
    };
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getReviewData() {
    const snapshot = await getDocs(reviewCollectionRef)
    const reviews = snapshot.docs.map( doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return reviews
}

export async function getTransactionsData() {
    const snapshot = await getDocs(transactionCollectionRef)
    const transactions = snapshot.docs.map( doc => ({
        ...doc.data(),
        id: doc.id
    }))
    
    return transactions
}


// A function whose only purpose is to delay execution
// for the specified # of milliseconds when used w/ `await`
// e.g. inside an async function:
// await sleep(2000)  => pauses the function for 2 seconds before moving on
//function sleep(ms) {
//    return new Promise(resolve => setTimeout(() => resolve(), ms))
//}

//export async function getVans(id) {
//    const url = id ? `/api/vans/${id}` : "/api/vans"
//    const res = await fetch(url)
//    if (!res.ok) {
//        throw {
//            message: "Failed to fetch vans",
//            statusText: res.statusText,
//            status: res.status
//        }
//    }
//    const data = await res.json()
//    return data.vans
//}

//export async function getHostVans(id) {
//    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//    const res = await fetch(url)
//    if (!res.ok) {
//        throw {
//            message: "Failed to fetch vans",
//            statusText: res.statusText,
//            status: res.status
//        }
//    }
//    const data = await res.json()
//    return data.vans
//}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}