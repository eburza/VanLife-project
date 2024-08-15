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
        <section className="host-section section">
            <h2 className="top-text">Your reviews</h2>

            <div className="host-rating">
                <h1>{ratingAverage()}</h1>
                <BsStarFill className="star star-l star-review-top" />
                <p>overall rating</p>
            </div>

            <HorizontalBarChart className="host-rating-chart"/>

            <div className="host-reviews-container host-container">
                <h3>Reviews ({hostData.reviewsData.length})</h3>

                {hostData.reviewsData.map((review) => (
                    <div key={review.id}>
                        <div className="review-container host-container">
                            <div className="star-container">
                                {[...Array(review.rating)].map((_, i) => (
                                    <BsStarFill className="star" key={i} />
                                ))}
                            </div>
                            <div className="info">
                                <p className="name">{review.name}</p>
                                <p className="date">{review.date}</p>
                            </div>
                            <p>{review.text}</p>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>

        </section>
    );
}
