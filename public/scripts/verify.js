
document.querySelector("#verifyUser").addEventListener("click", async (event) => {
    event.preventDefault()
    try {
        const data = {
            email: document.querySelector("#email").value,
            verifiedCode: document.querySelector("#verifiedCode").value
        }
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
        let response = await fetch("/api/sessions/verify", options)
        response = await response.json()

        if (response.statusCode === 200) {
            Swal.fire({
                title: 'Correctly verified!',
                text: response.message,
                icon: 'success',
                confirmButtonColor: "#7d5a7b",
                confirmButtonText: 'OK'
            }).then(() => {
                location.replace("/login")
            })
        } else {
            Swal.fire({
                title: 'Incorrect code!',
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