import React from "react"
import { Link } from "react-router-dom"
import { IoArrowBackOutline } from "react-icons/io5";

export default function HostVanDetail() {
    return (
        <div>
            <Link to="/host/vans">
                <div className="back-to-vans-page">
                    <IoArrowBackOutline />
                    <p>Back to vans</p>
                </div>
            </Link>
            <h2>van details</h2>
        </div>
    )
}