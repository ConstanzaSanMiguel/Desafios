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