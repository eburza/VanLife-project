import React, { useState, useEffect } from "react"
import VerticalBarChart from "../../components/VerticalBarChart"
import { useHostData } from "../../context/HostDataContext"

export default function Income() {
    const { hostData, formattedTransactions, transactionsAmount, error, loading } = useHostData()

    if (!hostData.incomeData || loading.income) {
        return <h1 aria-live="polite">Loading...</h1>
    }

    if (error.income) {
        console.error("Error occurred:", error.income)
        return <h1 aria-live="assertive">There was an error: {error.income.message || "Unknown error occurred"}</h1>
    }

    return (
        <section className="host-section income-section section">
            <h2 className="top-text">Income</h2>

            <h2 className="host-income">{formattedTransactions}</h2>

            <VerticalBarChart className="host-income-chart"/>

            <div className="transactions-container host-container">
                <h3 className="transaction-list-title">{`Your transactions ${transactionsAmount()}`}</h3>
                {hostData.incomeData?.map((item) => (
                    item.amount ? (
                        <div key={item.id} className="transaction">
                            <h3>${item.amount}</h3>
                            <p>{item.date}</p>
                        </div>
                    ) : null
                ))}
            </div>
        </section>
    )
}
