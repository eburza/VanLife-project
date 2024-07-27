import React from "react"


export default function Vans() {

    const [ vans, setVans ] = React.useState([])

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const uniqueTags = [...new Set(vans.map(van => van.type))];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const vanElements = vans.map(van => (
        <div key={van.id} className="van-element">
            <img className="van-img" src={van.imageUrl} />
            <div className="van-info">
                <h3 className="van-tile">{van.name}</h3>
                <div className="van-price">
                    <p className="van-list-price">${van.price}</p>
                    <p className="van-list-day">/day</p>
                </div>
            </div>
            <p className={`tag van-type-tag ${van.type} selected`}>{capitalizeFirstLetter(van.type)}</p>
        </div>
    ))

    return (
        <div className="main-vans">
            <h1 className="main-vans-title">Explore our van options</h1>

            <div className="tag-section">
                <div className="tag-list">
                    {uniqueTags.map(tag => (
                        <span key={tag} className="tag tag-list-el">{capitalizeFirstLetter(tag)}</span>
                    ))}
                </div>
                <p className="filters-reset"><u>Clear filters</u></p>
            </div>

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
