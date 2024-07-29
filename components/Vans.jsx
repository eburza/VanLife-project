import React from "react"
import { Link } from "react-router-dom"
import { capitalizeFirstLetter } from "../function/capitalizeFirstLetter"

export default function Vans() {

    const [ vans, setVans ] = React.useState([])

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const uniqueTags = [...new Set(vans.map(van => van.type))];

    const vanElements = vans.map(van => (
        <Link to={`/vans/${van.id}`} aria-label={`View details for ${van.name}, priced at $${van.price} per day`}>
            <div key={van.id} className="van-element">
                <img className="van-img" src={van.image} alt={`Image of ${van.name}`}/>
                <div className="van-info">
                    <p className="van-title">{van.name}</p>
                    <div className="van-price">
                        <p className="van-list-price">${van.price}</p>
                        <p className="van-list-day">/day</p>
                    </div>
                </div>
                <p className={`tag van-type-tag ${van.type} selected`}>{capitalizeFirstLetter(van.type)}</p>
            </div>
        </Link>
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
