const google = document.querySelector("#google")
google.addEventListener("click", async () => {
    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
        let response = await fetch("/api/sessions/google", options)
        response = await response.json()
        //console.log(response)
        if (response.session) {
            Swal.fire({
                title: 'Success!',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                location.replace("/")
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