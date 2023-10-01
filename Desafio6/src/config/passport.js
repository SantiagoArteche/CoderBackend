import local from "passport-local"
import passport from "passport"
import { createHash, validatePass } from "../utils/bcrypt.js"
import { usersModel } from "../models/users.models.js"

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(request, username, password, done) => {

        const { first_name, last_name, email, age } = request.body

        try {
            
            const user = await usersModel.findOne({ email: email })

            if(user){
                return done(null, false)
            }
            const passwordHash = createHash(password)

            const createUser = await usersModel.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                password: passwordHash
            })

            return done(null, createUser)

        } catch (error) {
            return done(error)
        }
    } ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {
            
            try {
                const user = await usersModel.findOne({ email: username })
                console.log(user)
                
                

                if (!user) {
                    return done(null, false)
                }

                if( validatePass(password, user.password) ){
                    return done(null, user)
                }

                return done(null, false)

            } catch (error) {
                return done(error)
            }
        }
    ))

    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await usersModel.findById(id)
        done(null, user)
    })


}

export default initializePassport