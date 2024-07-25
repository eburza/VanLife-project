import React from "react"
import { Link } from "react-router-dom"
import imgAbout from "../assets/imgAbout.png"

export default function About() {
    return (
        <main className="main-about">
            <img src={imgAbout} className="about-img"/>
            <div className="copy-section">
                <div className="about-main-copy">
                    <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
                    <div className="about-paragraph">
                        <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
                        <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                    </div>
                </div>
                <div className="about-vans-container">
                    <h2>Your destination is waiting.<br />Your van is ready.</h2>
                    <Link to="/vans" className="link">
                        <button className="btn-black-s">Explore our vans</button>
                    </Link>
                </div>
            </div>
        </main>
    )
}