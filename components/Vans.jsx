import React from "react"


export default function Vans() {

    const [ vans, setVans ] = React.useState([])

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    

    const vanElements = vans.map(van => (
        <div key={van.id} className="van-tile">
            <img className="van-img" src={van.imageUrl} />
            <div className="van-info">
                <h3>{van.name}</h3>
                <p>${van.price}<span>/day</span></p>
            </div>
            <p className={`van-type ${van.type} selected`}>{van.type}</p>
        </div>
    ))

    return (
        <div className="main-vans">
            <h1>Explore our van options</h1>
            <div className="van-list">
                { vanElements }
            </div>
        </div>
    )
}


/**
 * {
    * id: "1", 
    * name: "Modest Explorer", 
    * price: 60, 
    * description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", 
    * imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", 
    * type: "simple"
 * }
 */
