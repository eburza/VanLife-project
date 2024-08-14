import React from "react";
import { BsStarFill } from "react-icons/bs";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import { useHostData } from "../../context/HostDataContext";

export default function Reviews() {
    const { hostData, ratingAverage, error, loading } = useHostData();

    if (!hostData.reviewsData || loading.reviews) {
        return <h1 aria-live="polite">Loading...</h1>;
    }

    if (error.reviews) {
        console.error("Error occurred:", error.reviews);
        return <h1 aria-live="assertive">There was an error: {error.reviews.message || "Unknown error occurred"}</h1>;
    }

    return (
        <section className="host-section">
            <div className="top-text">
                <h2>Your reviews</h2>
            </div>

            <div className="host-rating">
                <h1>{ratingAverage()}</h1>
                <BsStarFill className="review-star rating-review-star" />
                <p>overall rating</p>
            </div>

            <HorizontalBarChart />

            <h3>Reviews ({hostData.reviewsData.length})</h3>
            {hostData.reviewsData.map((review) => (
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
    );
}
