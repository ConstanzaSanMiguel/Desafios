console.log("socket")

const socket = io()

socket.on("products", (data) => {

    console.log(data)

    const template = data
        .map(
            (each) => `
      <div class="products card m-2" style="width: 250px">
        <img src="${each.photo}" style="height: 250px" class="card-img-top object-fit-cover" alt="${each.name}">
        <h5 class="card-title text-center fs-6 m-3">${each.title}</h5>
      </div>
    `
        )
        .join("")
    document.querySelector("#products").innerHTML = template
})

socket.on("new product", data)

