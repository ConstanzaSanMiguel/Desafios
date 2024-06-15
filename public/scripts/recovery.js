document.querySelector("#newPassword").addEventListener("click", async (event) => {
    const password = document.querySelector("#password").value
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    if (!password || !token) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Password or token is missing!',
        })
        return
    }

    try {
        const response = await fetch("/api/sessions/recovery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, newPassword: password })
        })

        const data = await response.json()

        if (response.ok) {
            Swal.fire({
                text: response.message,
                icon: 'success',
                confirmButtonColor: "#7d5a7b",
                confirmButtonText: 'OK'
            }).then(() => {
                location.replace("/login")
            })
        } else {
            throw new Error(data.message || 'An error occurred')
        }
    } catch (error) {
        Swal.fire({
            title: 'Incorrect email.',
            icon: 'error',
            confirmButtonColor: "#7d5a7b",
            confirmButtonText: 'OK'
        })
    }
})
