import React from "react"
import { Link } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { useHostData } from "../../context/HostDataContext"

export default function Dashboard() {
    const { hostData, formattedTransactions, ratingAverage, error, loading } = useHostData()

    function renderVanElements() {
        if (!hostData.vansData || hostData.vansData.length === 0) {
            return <p>No vans listed</p>
        }

        return hostData.vansData.map((van) => (
            <div className="host-van-single" key={van.id}>
                <img src={van.image} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
                <Link to={`vans/${van.id}`}>View</Link>
            </div>
        ))
    }

    if (loading.income || loading.reviews || loading.vans) {
        return <h1 aria-live="polite">Loading...</h1>
    }

    if (error.income || error.reviews || error.vans) {
        console.error("Error occurred:", error)
        return <h1 aria-live="assertive">There was an error: {error.income?.message || error.reviews?.message || error.vans?.message || "Unknown error occurred"}</h1>
    }

    return (
        <section className="host-section">
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome!</h1>
                    <p>Income</p>
                    <h2>{formattedTransactions || "Loading..."}</h2>
                </div>
                <Link to="income">Details</Link>
            </section>

            <section className="host-dashboard-reviews">
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>
                    <span>{ratingAverage() || "Loading..."}</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>

            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                {renderVanElements()}
            </section>
        </section>
    )
}
