fetch("/api/sessions/", { method: "POST" })
    .then((res) => res.json())
    .then((res) => {
        if (res.statusCode === 200) {
            document.querySelector("#loginButton").style.display = "none"
            document.querySelector("#registerButton").style.display = "none"
            document.querySelector("#signout").addEventListener("click", async (event) => {
                fetch('/signout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'User signed out',
                                icon: 'success',
                                confirmButtonColor: '#7d5a7b',
                                confirmButtonText: 'OK',
                                timer: 5000
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
                    })
                    .catch(error => {
                        console.error('Error:', error)
                    })
            })
        } else {
            document.querySelector("#formButton").style.display = "none"
            document.querySelector("#ordersButton").style.display = "none"
            document.querySelector("#signout").style.display = "none"
        }
        if (res.response?.role === "user") {
            document.querySelector("#formButton").style.display = "none"
        } else if (res.response?.role == "admin") {
                document.querySelector("#ordersButton").style.display = "none"
            }
    })
