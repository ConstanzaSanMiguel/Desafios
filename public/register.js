const socket = io()

document.querySelector("#newUser").addEventListener("click", (event)=>{
    const form = event.target.form

    if(!event.target.form.checkValidity()){
        return null
    }
    event.preventDefault()
    const username = document.querySelector("#username").value
    const photo = document.querySelector("#photo").value
    const email = document.querySelector("#email").value
    
    const data = {}

    username && (data.name = username)
    photo && (data.photo = photo)
    email && (data.email = email)

    console.log(data)

    socket.emit("newUser", data)

    form.reset()
})