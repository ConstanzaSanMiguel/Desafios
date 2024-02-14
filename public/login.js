/*const socket = io()

document.querySelector("#userLogin").addEventListener("click", (event)=>{
    const form = event.target.form

    if(!event.target.form.checkValidity()){
        return null
    }
    event.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    
    const data = {}

    email && (data.email = email)
    password && (data.password = password)

    console.log(data)

    //socket.emit("newUser", data)

    //form.reset()
})*/