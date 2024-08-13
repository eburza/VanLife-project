import { transactionsData } from "../data/transactionsData";

const summedMonthlyIncome = transactionsData.reduce((acc, { month, amount }) => {
        // If the month is already in the accumulator, add the current amount to it
        if (acc[month]) {
            acc[month] += amount;
        } else {
            // Otherwise, create a new entry for the month
            acc[month] = amount;
        }
        return acc;
    }, {});

const resultArray = Object.keys(summedMonthlyIncome).map(month => ({
        month,
        amount: summedMonthlyIncome[month]
    }));
        

export { resultArray }
