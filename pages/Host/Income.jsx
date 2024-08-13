import React from "react"
import { useState, useEffect } from "react"
import { transactionsData } from "../../data/transactionsData"
import { calculateSum } from "../../function/calculateSum"
import VerticalBarChart from "../../components/VerticalBarChart"

export default function Income() {

    const [formattedTransactions, setFormattedTransactions] = useState("")

    useEffect(() => {
        const transactionSum = () => {
            const arrayData = transactionsData.map(({ amount }) => amount)
            const transactions = calculateSum(arrayData)

            let formatted

            if (transactions - Math.floor(transactions) !== 0) {
                formatted = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(transactions)
            } else {
                formatted = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(transactions)
            }
            
            setFormattedTransactions(formatted)
        }

        transactionSum()
    }, [])

    if (!formattedTransactions) {
        return <h1>Loading...</h1>
    }

    function transactionsAmount() {
        const arrayData = transactionsData.map(({ amount }) => amount)
        const zeroData = arrayData.filter( element => element <= 0)
        let number = 0

        if (!zeroData) {
            number = arrayData.length 
        } else {
            number = arrayData.length - zeroData.length
        }

        return number
    }

    return (
        <section className="host-section">

            <div className="top-text">
                    <h2>Income</h2>
            </div>
            
            <h2>{formattedTransactions}</h2>
            
            <VerticalBarChart />

            <div className="info-header">
                <h3>{`Your transactions ${transactionsAmount()}`}</h3>
            </div>

            <div className="transactions">
                {transactionsData.map((item) => (
                    item.amount ? (
                    <div key={item.id} className="transaction">
                        <h3>${item.amount}</h3>
                        <p>{item.date}</p>
                    </div> ) : ""
                ))}
            </div>
        </section>
    )
}
