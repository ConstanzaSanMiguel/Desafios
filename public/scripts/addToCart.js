const selector = document.querySelector(".addToCart")
selector.addEventListener("click", async (product) => {
    try {
        const data = { product: product.target.id }

        console.log("fetch prod: ", product)

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }

        let response = await fetch("/api/orders", options)
        response = await response.json()
        if (response.statusCode === 401) {
            Swal.fire({
                title: "Please log in or register.",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000,
                confirmButtonColor: "#7d5a7b",
                confirmButtonText: 'OK'
            })
        } else location.replace("/orders")
    } catch (error) {
        alert(error.message)
    }
})