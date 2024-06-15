const selectors = document.querySelectorAll(".deleteButton")
selectors.forEach((each) =>
    each.addEventListener("click", async (event) => {
        try {
            const url = "/api/orders/" + event.target.id;
            const opts = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
            let response = await fetch(url, opts)
            response = await response.json()
            if (response.statusCode === 200) {
                Swal.fire({
                    title: 'Product deleted!',
                    text: "This window will close in 2 seconds",
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    confirmButtonColor: "#7d5a7b",
                    confirmButtonText: 'OK'
                }).then(() => {
                    location.replace("/")
                })
            }
        } catch (error) {
            alert(error.message)
        }
    })
)

const uid = "id random"
fetch(`/api/orders/total/${uid}`)
    .then(response => response.json())
    .then(data => {
        const { total } = data.response[0]
        document.getElementById("total").textContent = `My total: USD ${total}`
    })
    .catch(error => {
        console.error("Cart error:" + error)
    })