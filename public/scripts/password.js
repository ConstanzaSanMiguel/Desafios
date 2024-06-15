
document.querySelector("#resetPassword").addEventListener("click", async (event) => {
    event.preventDefault()
    try {
        const data = {
            email: document.querySelector("#email").value,
        }
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
        let response = await fetch("/api/sessions/password", options)
        response = await response.json()

        if (response.statusCode === 200) {
            Swal.fire({
                text: response.message,
                icon: 'success',
                confirmButtonColor: "#7d5a7b",
                confirmButtonText: 'OK',
                timer: 5000
            }).then(() => {
                location.replace("/login")
            })
        } else {
            Swal.fire({
                title: 'Incorrect email.',
                text: response.message,
                icon: 'error',
                confirmButtonColor: "#7d5a7b",
                confirmButtonText: 'OK'
            })
        }
    } catch (error) {
        alert(error.message)
    }
})