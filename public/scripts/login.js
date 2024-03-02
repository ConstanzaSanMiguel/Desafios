
document.querySelector("#userLogin").addEventListener("click", async (event) => {
    try {
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        }
        let response = await fetch("/api/sessions/login", options)
        response = await response.json()

        console.log(response)

        if (response.statusCode === 200) {
            Swal.fire({
                title: 'Success!',
                text: response.message,
                icon: 'success',
                confirmButtonColor: "#7d5a7b",
                confirmButtonText: 'OK'
            }).then(() => {
                location.replace("/")
            })
        } else {
            Swal.fire({
                title: 'Error!',
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