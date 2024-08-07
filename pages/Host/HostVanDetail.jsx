import React from "react"
import { Link, useParams, NavLink, Outlet } from "react-router-dom"
import { IoArrowBackOutline } from "react-icons/io5";
import { capitalizeFirstLetter } from "../../function/capitalizeFirstLetter.js/"

export default function HostVanDetail() {

    const [ selectedVan, setSelectedVan ] = React.useState(null)

    const params = useParams()

    React.useEffect( () => {
        fetch(`/api/host/vans/${params.id}`)
            .then( res => res.json() )
            .then( data => setSelectedVan(data.vans) )
    }, [])

    if(!selectedVan){
        return <p>Loading...</p>
    }

    return (
        <section className="host-van-details">

            <div className="host-van-details-back">
                <Link to=".." relative="path">
                    <div className="back-to-vans-page host-van-detail-back">
                        <IoArrowBackOutline />
                        <p>Back to vans</p>
                    </div>
                </Link>
            </div>

            <div className="host-van-info-page">

                <div className="selected-van-details">
                    <img className="selected-van-img" src={`../../${selectedVan.image}`} alt={`image of ${selectedVan.name}`} />
                    <div className="selected-van-copy">
                        <p className={`selected-van-type tag van-type-tag ${selectedVan.type}`} >{capitalizeFirstLetter(selectedVan.type)}</p>
                        <p className="van-title van-info-title">{selectedVan.name}</p>
                        <p className="van-info-price"><span>${selectedVan.price}</span>/day</p>
                    </div>
                </div>

                <nav className="nav-links">
                    <NavLink 
                    to="."
                    className={({isActive}) => isActive ? "active-link" : null }
                    end
                    >
                        Details
                    </NavLink>
                    <NavLink 
                    to="pricing"
                    className={({isActive}) => isActive ? "active-link" : null }
                    >
                        Pricing
                    </NavLink>
                    <NavLink 
                    to="photos"
                    className={ ({isActive}) => isActive ? "active-link" : null }
                    >
                        Photos
                    </NavLink>
                </nav>

                <Outlet context={selectedVan} />
            </div>
        </section>
    )
}