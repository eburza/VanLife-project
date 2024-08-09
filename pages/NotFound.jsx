import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <section className="main-not-found">
            <h1>Sorry, the page you were looking for was not found..</h1>

            <Link to=".." className="link home-btn">
                <button className="btn-black">Return to home</button>
            </Link>
        </section>
    )
}