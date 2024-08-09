export async function getVans() {
    const res = await fetch("/api/vans")

    if (!res.ok) {
        throw {
            message: "Failed to fetch vans", 
            statusText: res.statusText,
            status: res.status
        }
    }

    const data = await res.json()
    return data.vans
}

/*
    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])
*/