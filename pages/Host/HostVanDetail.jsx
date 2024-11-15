import React from "react";
import { Link, useParams, NavLink, Outlet } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { capitalizeFirstLetter } from "../../function/capitalizeFirstLetter.js/";
import { getVan } from "../../services/api";

export default function HostVanDetail() {
    const [selectedVan, setSelectedVan] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const params = useParams();

    React.useEffect(() => {
        async function loadVan() {
            setLoading(true);
            try {
                const vanData = await getVan(params.id);
                if (vanData) {
                    setSelectedVan(vanData);
                } else {
                    setError(new Error("Van not found"));
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        loadVan();
    }, [params.id]);

    if (loading) {
        return <h1 aria-live="polite">Loading...</h1>;
    }

    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
    }

    if (!selectedVan) {
        return <p>Loading...</p>;
    }

    return (
        <section className="section host-details-section">
            <div className="host-van-details-back">
                <Link to=".." relative="path">
                    <div className="back-to-vans-section">
                        <IoArrowBackOutline />
                        <p>Back to vans</p>
                    </div>
                </Link>
            </div>

            <div className="host-van-info-container">
                <div className="van-details-container">
                    <img className="van-img" src={selectedVan.image} alt={`image of ${selectedVan.name}`} />
                    <div className="van-details-top-txt">
                        <p className={`tag tag-type tag-type-details ${selectedVan.type}`}>
                            {capitalizeFirstLetter(selectedVan.type)}
                        </p>
                        <p className="van-title">{selectedVan.name}</p>
                        <p className="van-info-price"><span>${selectedVan.price}</span>/day</p>
                    </div>
                </div>

                <nav className="nav-links">
                    <NavLink 
                        to="."
                        className={({ isActive }) => (isActive ? "active-link" : null)}
                        end
                    >
                        Details
                    </NavLink>
                    <NavLink 
                        to="pricing"
                        className={({ isActive }) => (isActive ? "active-link" : null)}
                    >
                        Pricing
                    </NavLink>
                    <NavLink 
                        to="photos"
                        className={({ isActive }) => (isActive ? "active-link" : null)}
                    >
                        Photos
                    </NavLink>
                </nav>

                <Outlet context={selectedVan} />
            </div>
        </section>
    );
}
