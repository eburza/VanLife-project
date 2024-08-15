import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanDetailPhotos() {

    const { image, name } = useOutletContext()

    return (
        <section className="section host-details-bottom-section">
            <img src={image} alt={`image of ${name}`} />
        </section>
    )
}