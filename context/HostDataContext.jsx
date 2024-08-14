import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTransactionsData, getReviewData, getHostVans } from '../api'
import { calculateSum } from "../function/calculateSum"
import { calculateAverage } from "../function/calculateAverage"

const HostDataContext = createContext()

export function HostDataProvider({ children }) {
    const [hostData, setHostData] = useState({
        incomeData: null,
        reviewsData: null,
        vansData: []
    })
    const [formattedTransactions, setFormattedTransactions] = useState("");

    const [loading, setLoading] = useState({
        income: false,
        reviews: false,
    })
    const [error, setError] = useState({
        income: null,
        reviews: null,
    })


    useEffect(() => {
        async function loadTransactions() {
            setLoading(prevState => ({ ...prevState, income: true }))
            try {
                const data = await getTransactionsData()
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
                setHostData(prevState => ({
                    ...prevState,
                    reviewsData: data,
                }));
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
                const data = await getHostVans()
                setHostData(prevState => ({
                    ...prevState,
                    vansData: data,
                }));
            } catch (err) {
                setError(prevState => ({ ...prevState, vans: err }))
            } finally {
                setLoading(prevState => ({ ...prevState, vans: false }))
            }
        }

        loadVans()
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
