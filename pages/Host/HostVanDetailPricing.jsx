import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanDetailPricing() {

    const { price } = useOutletContext()

    return (
        <section className="host-details-subp">
            <p className="van-info-price"><span>${price}</span>/day</p>
        </section>
    )
}