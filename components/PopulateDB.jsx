import React from 'react'
import { populateFirestore } from '../services/firestore-populate'

export default function PopulateDB() {
    const [status, setStatus] = React.useState('')

    const handlePopulate = async () => {
        try {
            setStatus('Loading...')
            await populateFirestore()
            setStatus('Database populated successfully!')
        } catch (error) {
            console.error('Error:', error)
            setStatus('Error populating database: ' + error.message)
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <button 
                onClick={handlePopulate}
                className="button btn-orange"
            >
                Populate Database
            </button>
            {status && <p>{status}</p>}
        </div>
    )
}