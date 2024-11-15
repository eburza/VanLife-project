import { db } from './firebase-config'
import { 
    collection, 
    doc, 
    setDoc, 
    writeBatch 
} from 'firebase/firestore/lite'

const vansData = [
    {
        id: "1",
        name: "Modest Explorer",
        price: 60,
        description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!",
        image: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png",
        type: "simple",
        hostId: "123"
    },
    {
        id: "2",
        name: "Beach Bum",
        price: 80,
        description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.",
        image: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png",
        type: "rugged",
        hostId: "123"
    },
    {
        id: "3",
        name: "Reliable Red",
        price: 100,
        description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
        image: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png",
        type: "luxury",
        hostId: "456"
    },
    {
        id: "4",
        name: "Dreamfinder",
        price: 65,
        description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.",
        image: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png",
        type: "simple",
        hostId: "789"
    },
    {
        id: "5",
        name: "The Cruiser",
        price: 120,
        description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.",
        image: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
        type: "luxury",
        hostId: "789"
    },
    {
        id: "6",
        name: "Green Wonder",
        price: 70,
        description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
        image: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
        type: "rugged",
        hostId: "123"
    }
]

const reviewsData = [
    {
        id: "1",
        rating: 5,
        name: "Elliot",
        date: "June 3, 2024",
        text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!"
    },
    {
        id: "2",
        rating: 5,
        name: "Sandy",
        date: "April 12, 2024",
        text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!"
    },
    {
        id: "3",
        rating: 4,
        name: "Elza",
        date: "July 1, 2024",
        text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!"
    },
    {
        id: "4",
        rating: 5,
        name: "Sabrina",
        date: "May 22, 2024",
        text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!"
    }
]

const transactionsData = [
    { id: "0a", amount: 0, month: "January", date: "January, '24" },
    { id: "0b", amount: 0, month: "February", date: "February, '24" },
    { id: "1", amount: 0, month: "March", date: "March, '24" },
    { id: "2", amount: 560, month: "April", date: "April 12, '24" },
    { id: "3", amount: 980, month: "May", date: "May 22, '24" },
    { id: "4", amount: 720, month: "June", date: "June 3, '24" },
    { id: "5", amount: 920, month: "June", date: "June 13, '24" },
    { id: "6", amount: 920, month: "June", date: "June 13, '24" },
    { id: "7", amount: 1120, month: "July", date: "July 1, '24" },
    { id: "8", amount: 840, month: "July", date: "July 15, '24" },
    { id: "9", amount: 240, month: "July", date: "July 25, '24" },
    { id: "10", amount: 160, month: "August", date: "August, '24" }
]

async function populateCollection(collectionName, data) {
    try {
        const batch = writeBatch(db)
        
        data.forEach((item) => {
            const docRef = doc(db, collectionName, item.id)
            batch.set(docRef, item)
        })
        
        await batch.commit()
        console.log(`Successfully populated ${collectionName} collection`)
    } catch (error) {
        console.error(`Error populating ${collectionName} collection:`, error)
        throw error
    }
}

export async function populateFirestore() {
    try {
        console.log('Starting database population...')
        
        // Populate all collections
        await populateCollection('vans', vansData)
        await populateCollection('reviews', reviewsData)
        await populateCollection('transactions', transactionsData)
        
        console.log('Database population completed successfully!')
    } catch (error) {
        console.error('Error during database population:', error)
        throw error
    }
}