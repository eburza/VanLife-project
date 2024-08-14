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
