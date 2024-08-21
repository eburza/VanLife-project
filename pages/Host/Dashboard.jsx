import React from "react"
import { Link } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { useHostData } from "../../context/HostDataContext"

export default function Dashboard() {

    const { hostData, formattedTransactions, ratingAverage, error, loading } = useHostData()
    console.log("Host Data:", hostData)

    function renderVanElements() {
        if (!hostData.hostVansData || hostData.hostVansData.length === 0) {
            return <p>No vans listed</p>
        }

        return hostData.hostVansData.map((van) => (
            <div className="host-van-list-solo" key={van.id}>
                <div className="host-van-list-solo-element">
                    <img className="host-van-list-img" src={van.image} alt={`Photo of ${van.name}`} />
                    <div className="host-van-list-copy">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
                <Link to={`vans/${van.id}`}>View</Link>
            </div>
        ))
    }


    //if (!hostData?.hostVansData) {
    //    console.error("Van data is missing or not properly loaded.");
    //    return <p>data unavailable</p>
    //}


    if (loading.income || loading.reviews || loading.vans) {
        return <h1 aria-live="polite">Loading...</h1>
    }
    
    if (error.income || error.reviews || error.vans) {
        console.error("Error occurred:", error)
        return <h1 aria-live="assertive">There was an error: {error.income?.message || error.reviews?.message || error.vans?.message || "Unknown error occurred"}</h1>
    }
    
    return (
        <section className="section host-dashboard-section">

            <section className="host-dashboard-earnings">
                <div className="host-dashboard-container dashboard-earnings">
                    <div className="info">
                        <h1 className="top-text">Welcome!</h1>
                        <p>Income</p>
                        <h2 className="host-income">{formattedTransactions || "Loading..."}</h2>
                    </div>
                    <Link to="income">Details</Link>
                </div>
            </section>
    
            <section className="host-dashboard-reviews">
                <div className="host-dashboard-container dashboard-reviews">
                    <h2>Review score</h2>
                    <BsStarFill className="star star-dashboard star-l" />
                    <p>
                        <span>{ratingAverage() || "Loading..."}</span>/5
                    </p>
                    <Link to="reviews">Details</Link>
                </div>
            </section>
    
            <section className="host-dashboard-vans host-van-list">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                {!hostData?.hostVansData ? (<p>data unavailable</p>) : renderVanElements() }
            </section>
        </section>
    )
}
