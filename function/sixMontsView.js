/*
function sixMontsView(data1, data2) {
    let sixMonths = []

    //const monthsView = data.map( ({month}) => month)

    const monthsView = [...new Set(data1.map(item => item[data2]))]

    if (monthsView.length <= 6) {
        sixMonths = monthsView
    } else {
        sixMonths = monthsView.splice(monthsView.length - 6, 6)
    }

    return sixMonths
}
*/
function sixMontsView(data) {
    const sixMonths = data.slice(-6);

    return sixMonths;
}

export { sixMontsView }

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
