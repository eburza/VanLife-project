import React from "react"
import { BsStarFill } from "react-icons/bs"
import { reviewsData } from "../../data/reviewsData"
import { calculateAverage } from "../../function/calculateAverage"
import HorizontalBarChart from "../../components/HorizontalBarChart"


export default function Reviews() {

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

    return (
            <section className="host-section">

                <div className="top-text">
                    <h2>Your reviews</h2>
                </div>

                <div className="host-rating">
                    <h1>{ratingAwerrage()}</h1>
                    <BsStarFill className="review-star rating-review-star" />
                    <p>overall rating</p>
                </div>

                <HorizontalBarChart />

                <h3>Reviews ({reviewsData.length})</h3>
                {reviewsData.map((review) => (
                    <div key={review.id}>
                        <div className="review">
                            {[...Array(review.rating)].map((_, i) => (
                                <BsStarFill className="review-star" key={i} />
                            ))}
                            <div className="info">
                                <p className="name">{review.name}</p>
                                <p className="date">{review.date}</p>
                            </div>
                            <p>{review.text}</p>
                        </div>
                        <hr />
                    </div>
                ))}

            </section>
    )
}
