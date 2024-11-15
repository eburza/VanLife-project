import { 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase-config'

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return {
            user: userCredential.user,
            error: null
        }
    } catch (error) {
        console.error("Auth Error:", error)
        return {
            user: null,
            error: {
                code: error.code,
                message: getErrorMessage(error.code)
            }
        }
    }
}

export const logoutUser = async () => {
    try {
        await signOut(auth)
        return { error: null }
    } catch (error) {
        return {
            error: {
                code: error.code,
                message: getErrorMessage(error.code)
            }
        }
    }
}

function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Invalid email address format'
        case 'auth/user-disabled':
            return 'This account has been disabled'
        case 'auth/user-not-found':
            return 'No account found with this email'
        case 'auth/wrong-password':
            return 'Incorrect password'
        case 'auth/network-request-failed':
            return 'Network error. Check your internet connection'
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Try again later'
        case 'auth/internal-error':
            return 'Authentication service error. Try again later'
        default:
            console.error("Unhandled error code:", errorCode) 
            return 'An error occurred. Please try again'
    }
}

export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user)
    })
}

export const getCurrentUser = () => {
    return auth.currentUser
}