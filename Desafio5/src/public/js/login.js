const socket = io()

const form = document.querySelector("#formLogin")
const formRegistrarse = document.querySelector("#formRegistrarse")
const bienvenida = document.querySelector("#bienvenida")
const deslog = document.querySelector("#deslogear")


// REGISTRARSE
if(formRegistrarse){
    formRegistrarse.addEventListener('submit', (e) =>{
        e.preventDefault()
        const datForm = new FormData(e.target)
        const newUser = Object.fromEntries(datForm)
        console.log(newUser)
        socket.emit("nuevoUsuario", newUser)
    })
    
    socket.on('usuarioRegistrado', (user) => {
        console.log(user)
        window.location.href = '/api/sessions/login'
    })
}

// LOGIN
if(form){
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const datForm = new FormData(e.target)
        const login = Object.fromEntries(datForm)

        try {
            const response = await fetch('/api/sessions/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login)
            })
            const info = await response.json()
            console.log(info);
            if (response.status === 200 || response.status === 404) {
            window.location.href = '/api/sessions/products' //Redireccionamiento
            }else{
                alert("error")
            }
    
        } catch (error) {
            console.log(error)
        }
    })}
    
        
// LOGOUT
if(deslog){
    deslog.addEventListener("click", async () => {

        try {
            await fetch('/api/sessions/logout', {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            window.location.href = '/api/sessions/login'
        } catch (error) {
            console.log(error)
        }
        
    })
}

   
    
    
    