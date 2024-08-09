import React from "react"
import { useParams, Link, useLocation } from "react-router-dom"
import { capitalizeFirstLetter } from "../../function/capitalizeFirstLetter.js/"
import { IoArrowBackOutline } from "react-icons/io5";
import { getVans } from "../../api"

export default function VanDetail() {

    const [ van, setVan] = React.useState(null)
    const [ loading, setLoading ] = React.useState(false)
    const [ error, setError ] = React.useState(null)
    const location = useLocation()
    const params = useParams()

    React.useEffect(() => {
        async function loadVan() {
            setLoading(true);
            try {
                const data = await getVans();
                const selectedVan = data.find(van => van.id === params.id);
                if (selectedVan) {
                    setVan(selectedVan);
                } else {
                    setError(new Error("Van not found"));
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
    
        loadVan();
    }, [params.id]);
    

    //const searchLink = location.state && location.state.search || ""
    const searchLink = location.state?.search || ""
    const hasFilters = !!searchLink

    if (loading) {
        return( 
            <h1 aria-live="polite">Loading...</h1>
        )
    }

    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }

    return (
        <div className="van-info-page">

            <Link to={hasFilters ? `..${searchLink}` : ".."} relative="path">
                <div className="back-to-vans-page">
                    <IoArrowBackOutline />
                    <p>{hasFilters ? "Back to selected vans" : "Back to all vans"}</p>
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