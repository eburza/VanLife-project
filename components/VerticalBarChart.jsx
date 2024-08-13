import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { sixMontsView } from '../function/sixMontsView'
import { resultArray } from '../function/summedMonthlyIncome'


// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function HorizontalBarChart() {

    const sixMonthData = sixMontsView(resultArray)

    const label = sixMonthData.map( item => item.month)
    const value = sixMonthData.map( item => item.amount)

    const data = {
        labels: label,
        datasets: [
            {
                label: 'Monthly Income',
                data: value,
                backgroundColor: '#ff8c38',
                borderWidth: 0,
            },
        ],
    };

    const options = {
        indexAxis: 'x', 
        scales: {
            x: {
                beginAtZero: true,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    console.log(sixMontsView(resultArray, 'month'))

    return <Bar data={data} options={options} />;
}
