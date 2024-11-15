import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
//import BurgerMenu from "./components/BurgerMenu"
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
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
import AuthorizationRequired from "./components/AuthorizationRequired"
import { HostDataProvider } from './context/HostDataContext'
import PopulateDB from './components/PopulateDB'



import "./server"

export default function App() {
    return (
      <HostDataProvider>
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Layout />}>
                <Route path="populate" element={<PopulateDB />} />
                
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="vans" element={<Vans />} />
                  <Route path="vans/:id" element={<VanDetail />} />
                  <Route path="login" element={<Login />} />

                  <Route element={<AuthorizationRequired />}>
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

                  <Route to="*" element={<NotFound />} />

                </Route>
            </Routes>
        </BrowserRouter>
      </HostDataProvider>
    )
  }