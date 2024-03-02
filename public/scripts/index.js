const params = new URLSearchParams(location.search)
const selector = document.querySelector("#text")
selector.value = params.get("title")

const performSearch = () => {
    try {
        const text = selector.value
        location.search = "title=" + text
    } catch (error) {
        alert(error.message)
    }
}

document.querySelector("#search").addEventListener("click", performSearch)

selector.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        performSearch()
    }
})

/*
// Función para mostrar el mensaje de "No products available"
function showNoProductsMessage() {
    const productsContainer = document.querySelector("#productsContainer")
    const noProductsMessage = document.querySelector("#noProducts")
    if (productsContainer) {
        productsContainer.style.display = "none"
    }
    if (noProductsMessage) {
        noProductsMessage.style.display = "block"
    }
}

// Verificar si hay productos para mostrar o no
window.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".products")
    if (products.length === 0) {
        showNoProductsMessage()
    }
})*/