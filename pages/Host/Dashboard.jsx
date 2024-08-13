import React from "react"
import { Link } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getHostVans } from "../../api"
import { useState, useEffect } from "react"
import { transactionsData } from "../../data/transactionsData"
import { calculateSum } from "../../function/calculateSum"
import { reviewsData } from "../../data/reviewsData"
import { calculateAverage } from "../../function/calculateAverage"

export default function Dashboard() {

    const [formattedTransactions, setFormattedTransactions] = useState("")
    const [vans, setVans] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const transactionSum = () => {
            const arrayData = transactionsData.map(({ amount }) => amount);
            const transactions = calculateSum(arrayData);
    
            let formatted;
    
            if (transactions - Math.floor(transactions) !== 0) {
                formatted = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(transactions);
            } else {
                formatted = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(transactions);
            }
            
            console.log('Formatted Transactions:', formatted); // Debugging
            setFormattedTransactions(formatted);
        }
    
        transactionSum();
    }, []);
    
    useEffect(() => {
        setLoading(true)
        getHostVans()
            .then(data => setVans(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    if (!formattedTransactions) {
        return <h1>Loading...</h1>
    }

    function ratingAwerrage() {
        const arrayData  = reviewsData.map(({ rating }) => rating)

        const rating = calculateAverage(arrayData)

        let ratingRounded

        if ( rating % 1 === 0) {
            ratingRounded = rating.toFixed(1)
        } else (
            ratingRounded = rating.toFixed(2)
        )

        return ratingRounded
    }

    function renderVanElements(vans) {
        const hostVansEls = vans.map((van) => (
            <div className="host-van-single" key={van.id}>
                <img src={van.image} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
                <Link to={`vans/${van.id}`}>View</Link>
            </div>
        ))

        return (
            <div className="host-vans-list">
                <section>{hostVansEls}</section>
            </div>
        )
    }

    // if (loading) {
    //     return <h1>Loading...</h1>
    // }

    if (error) {
        return <h1>Error: {error.message}</h1>
    }

    return (
        <section className="host-section">
        <section className="host-dashboard-earnings">
            <div className="info">
                <h1>Welcome!</h1>
                <p>Income</p>
                <h2>{formattedTransactions || "Loading..."}</h2> {/* Add fallback text for loading */}
            </div>
            <Link to="income">Details</Link>
        </section>

            <section className="host-dashboard-reviews">
                <h2>Review score</h2>

                <BsStarFill className="star" />

                <p>
                    <span>{ratingAwerrage()}</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                {
                    loading && !vans
                    ? <h1>Loading...</h1>
                    : (
                        <>
                            {renderVanElements(vans)}
                        </>
                    )
                }
                {/*<React.Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={loaderData.vans}>{renderVanElements}</Await>
                </React.Suspense>*/}
            </section>
        </section>
    )
}
