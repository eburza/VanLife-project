import React from "react"
import { Link } from "react-router-dom"
import { getHostVans } from "../../api"

export default function HostVans() {

    const [hostVans, setHostVans] = React.useState([])
    const [ loading, setLoading ] = React.useState(false)
    const [ error, setError ] = React.useState(null)

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setHostVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [])

    const hostVanList = hostVans.map( hostVan => (
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

    if (loading) {
        return( 
            <h1 aria-live="polite">Loading...</h1>
        )
    }

    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }

    return (
        <div>
            { hostVans.length > 0 ?
                (<section className="host-van-list">
                    <h1>Your listed vans</h1>
                    { hostVanList }
                </section>) :
                ( <p className="host-van-list-empty">Loading...</p>)
            }
        </div>
    )
}