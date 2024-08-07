import React from "react"
import { useParams, Link } from "react-router-dom"
import { capitalizeFirstLetter } from "../../function/capitalizeFirstLetter.js/"
import { IoArrowBackOutline } from "react-icons/io5";

export default function VanDetail() {

    const [ van, setVan] = React.useState(null)

    const params = useParams()

    React.useEffect( () => {
        fetch(`/api/vans/${params.id}`)
            .then( res => res.json() )
            .then( data => setVan(data.vans))
    }, [params.id])

    return (
        <div className="van-info-page">

            <Link to=".." relative="path">
                <div className="back-to-vans-page">
                    <IoArrowBackOutline />
                    <p>Back to all vans</p>
                </div>
            </Link>
            
            {van ? (
                <div className="van-info-page-copy">
                    <img className="img-van-info-page" src={van.image} alt={`Image of ${van.name}`}/>
                    <p className={`tag van-type-tag van-info-tag ${van.type}`} >{capitalizeFirstLetter(van.type)}</p>
                    <p className="van-title van-info-title">{van.name}</p>
                    <p className="van-info-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                </div>
            ) : <h2>Loading...</h2>}

            <Link to="./vans" className="link van-info-btn-orange">
                <button className="btn-orange">Rent this van</button>
            </Link>
        </div>
    )
}