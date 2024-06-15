document.querySelector("#newProduct").addEventListener("click", async (event) => {
    const form = event.target.form

    if (!event.target.form.checkValidity()) {
        return null
    }
    event.preventDefault()
    const data = {
        title: document.querySelector("#name").value,
        photo: document.querySelector("#image").value,
        price: document.querySelector("#price").value,
        stock: document.querySelector("#stock").value
    }

    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
        let response = await fetch("/api/products", options);
        response = await response.json()
        if (response.statusCode === 201) {
            Swal.fire({
                title: 'Success!',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                form.reset()
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred: ' + response.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    } catch (error) {
        alert(error.message)
    }
})