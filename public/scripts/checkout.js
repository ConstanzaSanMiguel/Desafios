document.querySelector("#checkout").onclick = () =>
    fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((res) => {
            Swal.fire({
                title: 'Proceeding to checkout',
                text: "This window will close in 2 seconds",
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                confirmButtonColor: "#7d5a7b",
                confirmButtonText: 'OK'
            }).then(() => {
                location.replace(res.url)
            })
        })
        .catch(error => {
            console.error('Error:', error)
        })