import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import { capitalizeFirstLetter } from "../../function/capitalizeFirstLetter"
import { useHostData } from "../../context/HostDataContext"

export default function Vans() {

    const { hostData, error, loading } = useHostData();
    const [ searchParams, setSearchParams ] = useSearchParams()

    const typeSearch = searchParams.get("type")?.split(",") || []

    //const displayVans = typeSearch
    //    ? vans.filter( van => van.type === typeSearch )
    //    : vans

    const displayVans = typeSearch.length > 0
    ? hostData.vansData.filter(van => typeSearch.includes(van.type))
    : hostData.vansData

    const uniqueTags = [...new Set(hostData.vansData.map(van => van.type))];

    const vanElements = displayVans.map(van => (
        <Link 
        to={van.id}
        key={van.id}
        state={searchParams.toString() ? { search: `?${searchParams.toString()}` } : {}}
        aria-label={`View details for ${van.name}, priced at $${van.price} per day`}>
            <div className="van-element">
                <img className="van-img" src={van.image} alt={`Image of ${van.name}`}/>
                <div className="van-info">
                    <p className="van-title">{van.name}</p>
                    <div className="van-price">
                        <p className="van-list-price">${van.price}</p>
                        <p className="van-list-day">/day</p>
                    </div>
                </div>
                <p className={`tag tag-type ${van.type}`}>{capitalizeFirstLetter(van.type)}</p>
            </div>
        </Link>
    ))

    //function handleFilterChange( key, value ) {
    //    setSearchParams( prevSearchParams => {
    //        if ( value === null ){
    //            prevSearchParams.delete(key)
    //        } else {
    //            prevSearchParams.set(key, value)
    //        }
    //        return prevSearchParams
    //    })
    //} 

    function handleFilterChange(tag) {
        setSearchParams(prevSearchParams => {
            const currentTags = prevSearchParams.get("type")?.split(",") || []
            let updatedTags

            if (currentTags.includes(tag)) {
                // If the tag is already selected, remove it
                updatedTags = currentTags.filter(t => t !== tag)
            } else {
                // Otherwise, add it to the list
                updatedTags = [...currentTags, tag]
            }

            if (updatedTags.length > 0) {
                prevSearchParams.set("type", updatedTags.join(","))
            } else {
                prevSearchParams.delete("type")
            }

            return prevSearchParams
        })
    }

    if (loading.vans) {
        return <h1 aria-live="polite">Loading...</h1>
    }

    if (error.vans) {
        console.error("Error occurred:", error.vans)
        return <h1 aria-live="assertive">There was an error: {error.vans?.message || "Unknown error occurred"}</h1>;
    }

    if (!hostData.vansData.length) {
        return <p>No vans available.</p>
    }

    return (
        <section className="section section-vans">
            <h1 className="section-vans-title">Explore our van options</h1>

            <div className="tag-container">
                {uniqueTags.length > 0 ? (
                    <div className="tag-list">
                        {uniqueTags.map(tag => (
                            <p 
                                onClick={() => handleFilterChange(tag)} 
                                key={tag} 
                                className={`tag tag-list-el tag-list-el-${tag} ${typeSearch.includes(tag) ? `active active-${tag}` : ''}`}
                            >
                                {capitalizeFirstLetter(tag)}
                            </p>
                        ))}
                    </div>
                ) : (
                    <p>No filters available.</p>
                )
                }
                {typeSearch.length > 0 && (
                    <p onClick={() => setSearchParams({})} className="tag-reset"><u>Clear filters</u></p>)
                }
            </div>

            { hostData.vansData.length > 0 ?
                (<div className="van-list">
                    {vanElements}
                </div>) :
                (<p className="host-van-list-empty">No vans available.</p>) }
        </section>
    )
}




/*
<div className="tag-section">
    <div className="tag-list">
        {uniqueTags.map(tag => (
            <p onClick={ () => setSearchParams({type: `${tag}`})} key={tag} className="tag tag-list-el">{capitalizeFirstLetter(tag)}</p>
        ))}
    </div>
    <p onClick={ () => setSearchParams({})} className="filters-reset"><u>Clear filters</u></p>
</div>
*/
