import React from "react"
import { Link } from "react-router-dom"
import imgAbout from "../assets/imgAbout.png"

export default function About() {
    return (
        <section className="section section-about">

            <div className="image-container-about">
                <img src={imgAbout} className="img-about" alt={`Image of a man sitting on van roof, while looking on starry sky`}/>
            </div>

            <div className="section-about-content">
                <div className="copy-container padding">
                    
                    <div className="copy-container copy-container-small-gap">
                        <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
                        <div className="copy-container copy-container-small-gap">
                            <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
                            <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                        </div>
                    </div>

                    <div className="about-vans-container">
                        <h2>Your destination is waiting.<br />Your van is ready.</h2>
                        <Link to="/vans" className="link">
                            <button className="button btn-black btn-s">Explore our vans</button>
                        </Link>
                    </div>

                </div>
            </div>

        </section>
    )
}