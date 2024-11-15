import React from "react"
import { useOutletContext } from "react-router-dom"
import { capitalizeFirstLetter } from "../../function/capitalizeFirstLetter.js/"

export default function HostVanDetailInfo() {

    const { name, type, description } = useOutletContext() 

    return (
        <section className="section host-details-bottom-section">
            <p><span className="bold">Name: </span>{name}</p>
            <p><span className="bold">Type: </span>{capitalizeFirstLetter(type)}</p>
            <p className="bottom-section-description"><span className="bold">Description: </span>{description}</p>
            <p><span className="bold">Visibility: </span>Public</p>
        </section>
    )
}