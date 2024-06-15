document.querySelector("#newUser").addEventListener("click", async (event) => {

    event.preventDefault()

    const data = {
        name: document.querySelector("#username").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        photo: document.querySelector("#photo").value
    }

    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
        let response = await fetch("/api/sessions/register", options)
        response = await response.json()
        if (response.statusCode === 200) {
            Swal.fire({
                title: 'Success!',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                location.replace("/login")
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: response.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    } catch (error) {
        alert(error.message)
    }
})