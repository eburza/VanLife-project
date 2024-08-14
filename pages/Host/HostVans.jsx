import React from "react"
import { Link } from "react-router-dom"
import { useHostData } from "../../context/HostDataContext";

export default function HostVans() {

    const { hostData, error, loading } = useHostData();

    const hostVanList = hostData.vansData.map( hostVan => (
        <Link to={hostVan.id}>
            <div key={hostVan.id} className="host-van-list-element">
                <img className="host-van-list-img" src={hostVan.image} alt={`image of ${hostVan.name}`}/>
                <div className="host-van-list-copy">
                    <p className="host-van-list-name">{hostVan.name}</p>
                    <p className="host-van-list-price">${hostVan.price}<span>/day</span></p>
                </div>
            </div>
        </Link>
        
    ))

    if (loading.vans) {
        return( 
            <h1 aria-live="polite">Loading...</h1>
        )
    }

    if (error.vans) {
        return <h1 aria-live="assertive">There was an error: {error.vans.message}</h1>
    }

    return (
        <div>
            { hostData.vansData.length > 0 ?
                (<section className="host-van-list">
                    <h1>Your listed vans</h1>
                    { hostVanList }
                </section>) :
                ( <p className="host-van-list-empty">Loading...</p>)
            }
        </div>
    )
}