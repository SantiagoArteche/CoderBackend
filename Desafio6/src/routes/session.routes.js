import { Router } from "express";
import passport from "passport";


const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), async(request, response) => {
    try {

        if(!request.user) {
            return response.status(401).send({ mes: 'Usuario invalido' })
        }

        request.session.user = {
            first_name: request.user.first_name,
            last_name: request.user.last_name,
            age: request.user.age,
            email: request.user.email
        }

        response.status(200).send({ payload: request.user })
    } catch (error) {
        response.status(500).send({ mes: `Error al iniciar sesion ${error}` })
    }
})

sessionRouter.post('/register', passport.authenticate('register'), async(request, response) => {
    try {
        if(!request.user) {
            return response.status(400).send({ mes: 'Usuario ya existente' })
        }

        response.status(200).send({ mes: 'Usuario registrado' })
    } catch (error) {
        response.status(500).send({ mes: `Error al registrar usuario ${error}` })
    }
})

sessionRouter.get("/logout", (request, response) => {
    if(request.session.login == true){
        request.session.destroy()
        response.status(200).send({ res: "error", mes: "usuario deslogeado"})
    }else{
        response.status(404).send({ res: "error", mes: "no hay ningun usuario logeado"})
    }
})

export default sessionRouter