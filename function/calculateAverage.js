function calculateAverage (data) {
    const average = data.reduce((a, b) => a + b, 0) / data.length
    return average
}

export { calculateAverage }