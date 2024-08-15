import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanDetailPricing() {

    const { price } = useOutletContext()

    return (
        <section className="section host-details-bottom-section">
            <p className="van-info-price"><span>${price}</span>/day</p>
        </section>
    )
}