const socket = io()

document.querySelector("#newProduct").addEventListener("click", (event)=>{
    const form = event.target.form
    
    if(!event.target.form.checkValidity()){
        return null
    }
    event.preventDefault()
    const title = document.querySelector("#name").value
    const photo = document.querySelector("#image").value
    const price = document.querySelector("#price").value
    const stock = document.querySelector("#stock").value
    
    const data = {}

    title && (data.title = title)
    photo && (data.photo = photo)
    price && (data.price = price)
    stock && (data.stock = stock)

    console.log(data)

    socket.emit("new product", data)

    form.reset()
})