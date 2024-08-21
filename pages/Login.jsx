import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { loginUser } from "../api"

//email: "b@b.com", password: "p123"

export default function Login() {

    const [ loginForm, setLoginForm ] = React.useState( {email: "", password: ""} )
    const [ state, setState ] = React.useState("idle")
    const [ error, setError ] = React.useState(null)

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || sessionStorage.getItem("lastPage") || "/"

    React.useEffect(() => {
        if (localStorage.getItem("wasLoggedOut")) {
            setTimeout(() => {
                localStorage.removeItem("wasLoggedOut")
            }, 3000);
        }
    }, [])

    //console.log("Navigating from:", from)

    function handleSubmit(event) {
        event.preventDefault()

        setState("submitting")
        
        loginUser(loginForm)
            .then( data => {
                setError(null);
                localStorage.setItem("loggedin", true)
                localStorage.removeItem("wasLoggedOut")
                navigate(from, { replace: true })
            })
            .catch(err => {
                setError(err)
            })
            .finally( () => {
                setState("idle")
            })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <section className="login-section section">
            {location.state?.message && <h3 className="txt-color">{location.state.message}</h3>}
            {localStorage.getItem("wasLoggedOut") && <h3 className="txt-color">You have successfully logged out!</h3>}
            <h1>Sign in to your account</h1>
            {error?.message && <h3 className="login-error">{error.message}</h3>}

            <form onSubmit={handleSubmit} className="login-form"> 
                <input
                    className="input-email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={loginForm.email}
                    onChange={handleChange}>
                </input>
                <input 
                    className="input-password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleChange}>
                </input>
                <button 
                disabled={state === "submitting"} 
                className="login-btn btn-orange button">
                    {state === "submitting" ? "Logging in..." :  "Sign in"}
                </button>
            </form>

            <p>Don’t have an account? <span className="txt-color bold">Create one now</span>.</p>
        </section>
    )
}