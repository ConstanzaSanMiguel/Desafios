const selectors = document.querySelectorAll(".deleteProdButton")
selectors.forEach((each) =>
    each.addEventListener("click", async (event) => {
        try {
            const url = "/api/products/" + event.target.id;
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
                    window.location.href = "/"
                })
            }
        } catch (error) {
            alert(error.message)
        }
    })
)