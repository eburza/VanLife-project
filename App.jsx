import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from './pages/Vans/Vans'
import VanDetail from "./pages/Vans/VanDetail"
import Dashboard from "./pages/Host/Dashboard"
import HostVans from "./pages/Host/HostVans"
import HostVanDetail from "./pages/Host/HostVanDetail"
import HostVanDetailInfo from "./pages/Host/HostVanDetailInfo"
import HostVanDetailPricing from "./pages/Host/HostVanDetailPricing"
import HostVanDetailPhotos from "./pages/Host/HostVanDetailPhotos"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"


import "./server"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>

                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="vans" element={<Vans />} />
                  <Route path="vans/:id" element={<VanDetail />} />

                  <Route path="host" element={<HostLayout />}>
                    <Route index element={<Dashboard />}/>
                    <Route path="income" element={<Income />}/>
                    <Route path="vans" element={<HostVans />} />
                    <Route path="vans/:id" element={<HostVanDetail />} >
                      <Route index element={<HostVanDetailInfo />} />
                      <Route path="pricing" element={<HostVanDetailPricing />} />
                      <Route path="photos" element={<HostVanDetailPhotos />} />
                    </Route>
                    <Route path="reviews" element={<Reviews />} />
                  </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )
  }