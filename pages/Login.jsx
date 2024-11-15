import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { signIn } from "../services/firebase-auth"

export default function Login() {
    const [loginForm, setLoginForm] = React.useState({ email: "", password: "" })
    const [state, setState] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || sessionStorage.getItem("lastPage") || "/"

    React.useEffect(() => {
        if (localStorage.getItem("wasLoggedOut")) {
            setTimeout(() => {
                localStorage.removeItem("wasLoggedOut")
            }, 3000)
        }
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        setState("submitting")
        console.log("Attempting login with:", loginForm.email) // Debug log

        const { user, error } = await signIn(loginForm.email, loginForm.password)

        if (error) {
            console.error("Login error:", error) // Debug log
            setError(error)
            setState("idle")
            return
        }

        console.log("Login successful:", user) // Debug log
        setError(null)
        localStorage.setItem("loggedin", true)
        localStorage.setItem("userId", user.uid)
        localStorage.removeItem("wasLoggedOut")
        navigate(from, { replace: true })
        setState("idle")
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function fillDemoCredentials() {
        setLoginForm({
            email: "b@b.com",
            password: "pass123"
        })
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
                    onChange={handleChange}
                    required
                />
                <input 
                    className="input-password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleChange}
                    required
                />
                <button 
                    disabled={state === "submitting"} 
                    className="login-btn btn-orange button"
                >
                    {state === "submitting" ? "Logging in..." : "Sign in"}
                </button>
            </form>

            <p className="demo-credentials">
                Demo Account: b@b.com / pass123 {" "}
                <button 
                    onClick={fillDemoCredentials}
                    className="txt-color bold"
                    style={{ 
                        background: "none", 
                        border: "none", 
                        padding: 0,
                        cursor: "pointer"
                    }}
                >
                    (Click to fill)
                </button>
            </p>
        </section>
    )
}