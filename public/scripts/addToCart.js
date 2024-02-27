const selector = document.querySelector(".addToCart")
selector.addEventListener("click", async (product) => {
    try {
        const data = { product: product.target.id }
        console.log("data: "+data)
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
        let response = await fetch("/api/orders", options)
        response = await response.json()
        console.log(response)
        if (response.statusCode === 401) alert("PLEASE LOG IN!")
        else location.replace("/orders")
    } catch (error) {
        alert(error.message)
    }
});