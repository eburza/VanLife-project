import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { reviewsData } from '../data/reviewsData';  // Adjust the path as necessary

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function CustomHorizontalBarChart() {
    // Calculate the count of each star rating
    const starCounts = [5, 4, 3, 2, 1].map(star =>
        reviewsData.filter(review => review.rating === star).length
    );

    // Calculate the percentage of each star rating
    const totalReviews = reviewsData.length;
    const starPercentages = starCounts.map(count => (totalReviews > 0 ? (count / totalReviews) * 100 : 0));

    const data = {
        labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
        datasets: [
            {
                label: 'Percentage',
                data: starPercentages,
                backgroundColor: 'transparent',  // Transparent background for bars
                borderRadius: 5,
                barPercentage: 1,
                categoryPercentage: 1,
                borderWidth: 0,
            },
        ],
    };

    const options = {
        indexAxis: 'y',  // Horizontal bar chart
        scales: {
            x: {
                display: false,  // Hide the x-axis
                grid: {
                    display: false,  // Hide grid lines
                },
                max: 100,  // Max value for percentage
                beginAtZero: true,
            },
            y: {
                display: false,  // Hide the y-axis
                grid: {
                    display: false,  // Hide grid lines
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,  // Hide the legend
            },
            tooltip: {
                enabled: false,  // Disable tooltips
            },
        },
        maintainAspectRatio: false,
        layout: {
            padding: 0,
        },
    };

    return (
        <div className="chart-element">
            <div className="chart-label-star chart-label">
                {data.labels.map((label, index) => (
                    <p key={index}>
                        {label}
                    </p>
                ))}
            </div>

            <div className='bars-container'>
                {data.labels.map((label, index) => (
                    <div className="chart-bar-w" key={index}>
                        <div className="chart-bar-o" 
                        style={{ width: `${starPercentages[index]}%` }} />
                    </div>
                ))}
            </div>

            <div className="chart-label-precentage chart-label">
                {starPercentages.map((percentage, index) => (
                    <p key={index}>
                        {percentage.toFixed(0)}%
                    </p>
                ))}
            </div>
        </div>
    );
}