import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Header from "./components/Header"
import About from "./components/About"
import Vans from './components/Vans'
import Footer from "./components/Footer"

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/vans" element={<Vans />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
  }