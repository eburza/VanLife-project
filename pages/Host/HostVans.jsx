import React from "react"
import { Link } from "react-router-dom"

export default function HostVans() {

    const [hostVans, setHostVans] = React.useState([])

    React.useEffect( () => {
        fetch("/api/host/vans")
            .then(res => res.json())
            .then(data => setHostVans(data.vans))
    })

    const hostVanList = hostVans.map( hostVan => (
        <Link to={`/host/vans/${hostVan.id}`}>
            <div key={hostVan.id} className="host-van-list-element">
                <img className="host-van-list-img" src={hostVan.image} alt={`image of ${hostVan.name}`}/>
                <div className="host-van-list-copy">
                    <p className="host-van-list-name">{hostVan.name}</p>
                    <p className="host-van-list-price">${hostVan.price}<span>/day</span></p>
                </div>
            </div>
        </Link>
        
    ))

    return (
        <div className="host-van-list">
            <h1>Your listed vans</h1>
            { hostVanList }
        </div>
    )
}