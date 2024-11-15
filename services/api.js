import {
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"
import { db } from './firebase-config'

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
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    
    if (!snapshot.exists()) {
        throw new Error("Van not found")
    }

    return {
        ...snapshot.data(),
        id: snapshot.id
    }
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
    const reviews = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return reviews
}

export async function getTransactionsData() {
    const snapshot = await getDocs(transactionCollectionRef)
    const transactions = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return transactions
}