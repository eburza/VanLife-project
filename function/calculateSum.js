let sum = 0

function calculateSum (data) {
    
    for ( let i = 0; i < data.length; i++) {
        sum += data[i]
    }
    
    return sum
}

export { calculateSum }