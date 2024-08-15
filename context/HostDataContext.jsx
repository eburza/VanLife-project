import React, { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getTransactionsData, getReviewData, getHostVans, getVans, getVan } from '../api'
import { calculateSum } from "../function/calculateSum"
import { calculateAverage } from "../function/calculateAverage"

const HostDataContext = createContext()

export function HostDataProvider({ children }) {
    const [hostData, setHostData] = useState({
        incomeData: null,
        reviewsData: null,
        hostVansData: [],
        vansData: [],
        vanData: null
    })
    const [formattedTransactions, setFormattedTransactions] = useState("")

    const [loading, setLoading] = useState({
        income: false,
        reviews: false,
    })
    const [error, setError] = useState({
        income: null,
        reviews: null,
    })

    const params = useParams()

    useEffect(() => {
        async function loadTransactions() {
            setLoading(prevState => ({ ...prevState, income: true }))
            try {
                const data = await getTransactionsData()

                if (!data) throw new Error("Data not found")

                setHostData(prevState => ({
                    ...prevState,
                    incomeData: data,
                }))
            } catch (err) {
                setError(prevState => ({ ...prevState, income: err }))
            } finally {
                setLoading(prevState => ({ ...prevState, income: false }))
            }
        }

        loadTransactions()
    }, [])

    useEffect(() => {
        async function loadReviews() {
            setLoading(prevState => ({ ...prevState, reviews: true }))
            try {
                const data = await getReviewData()

                if (!data) throw new Error("Data not found")

                setHostData(prevState => ({
                    ...prevState,
                    reviewsData: data,
                }))
            } catch (err) {
                setError(prevState => ({ ...prevState, reviews: err }))
            } finally {
                setLoading(prevState => ({ ...prevState, reviews: false }))
            }
        }

        loadReviews()
    }, [])

   useEffect(() => {
        async function loadVans() {
            setLoading(prevState => ({ ...prevState, vans: true }))
            try {
                const data = await getVans()

                if (!data) throw new Error("Data not found")

                setHostData(prevState => ({
                    ...prevState,
                    vansData: data,
                }))
            } catch (err) {
                setError(prevState => ({ ...prevState, vans: err }))
            } finally {
                setLoading(prevState => ({ ...prevState, vans: false }))
            }
        }

        loadVans()
    }, [])

/*
    useEffect(() => {
        async function loadVan() {
            setLoading(prevState => ({ ...prevState, vans: true }))
            try {
                const data = await getVan(params.id)

                if (!data) throw new Error("Data not found")

                setHostData(prevState => ({
                    ...prevState,
                    vanData: data,
                }));
            } catch (err) {
                setError(prevState => ({ ...prevState, vans: err }))
            } finally {
                setLoading(prevState => ({ ...prevState, vans: false }))
            }
        }

        loadVan()
    }, [params.id])
*/
    useEffect(() => {
        async function loadHostVans() {
            setLoading(prevState => ({ ...prevState, vans: true }))
            try {
                const data = await getHostVans()

                if (!data) throw new Error("Data not found")

                setHostData(prevState => ({
                    ...prevState,
                    hostVansData: data,
                }));
            } catch (err) {
                setError(prevState => ({ ...prevState, vans: err }))
            } finally {
                setLoading(prevState => ({ ...prevState, vans: false }))
            }
        }

        loadHostVans()
    }, [])

    useEffect(() => {
        if (hostData.incomeData) {
            const arrayData = hostData.incomeData.map(({ amount }) => amount)
            const transactions = calculateSum(arrayData)

            const formatted = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: transactions % 1 === 0 ? 0 : 2
            }).format(transactions)

            setFormattedTransactions(formatted)
        }
    }, [hostData.incomeData])

    function transactionsAmount() {
        const arrayData = hostData.incomeData?.map(({ amount }) => amount) || []
        const nonZeroTransactions = arrayData.filter(element => element > 0)
        return nonZeroTransactions.length
    }

    const ratingAverage = () => {
        if (!hostData || !hostData.reviewsData || hostData.reviewsData.length === 0) {
            return 0
        }

        const ratingsArray = hostData.reviewsData.map(({ rating }) => rating);
        const rating = calculateAverage(ratingsArray);

        return rating % 1 === 0 ? rating.toFixed(1) : rating.toFixed(2);
    }

    function updateReviewsData(newReviews) {
        setHostData(prevState => ({
            ...prevState,
            reviewsData: newReviews,
        }))
    }

    function updateIncomeData(newIncome) {
        setHostData(prevState => ({
            ...prevState,
            incomeData: newIncome,
        }))
    }

    return (
        <HostDataContext.Provider value={{ hostData, transactionsAmount, ratingAverage, formattedTransactions, loading, error }}>
            {children}
        </HostDataContext.Provider>
    )
}

export function useHostData() {
    return useContext(HostDataContext)
}


/*    React.useEffect(() => {
        async function loadVan() {
            setLoading(true)
            try {
                const vanData = await getVan(params.id)
                if (vanData) {
                    setVan(vanData)
                } else {
                    setError(new Error("Van not found"))
                }
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
    
        loadVan()
    }, [params.id]) */
