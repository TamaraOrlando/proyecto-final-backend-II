import passport from "passport";
import jwt from "passport-jwt"; 
import config from "./config.js";
import UserRepository from "../repository/user.repository.js";
import CartService from "../services/cart.service.js";
import GoogleStrategy from "passport-google-oauth20";


const JWT_SECRET = config.JWT_SECRET;
const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;


console.log("JWT_SECRET:", JWT_SECRET);

const JWTStrategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt; 


const cookieExtractor = req => {
    let token = null; 
     
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]; 
        console.log("Token extraído:", token);
    }
    return token; 
}

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: JWT_SECRET, 
        
    }, async (jwt_payload, done) => {
        console.log("Payload decodificado:", jwt_payload);
        try {
            return done(null, jwt_payload); 
        } catch (error) {
            return done(error);
        }
    }))
}



passport.use("google", new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/sessions/googlecallback"
}, async (accessToken, refreshToken, profile, done) => {
    try {

        console.log(profile);

        let user = await UserRepository.getUserByEmail(profile._json.email)

        if(!user) {
            let newUser = {
                first_name: profile._json.given_name,
                last_name: profile._json.family_name,
                age: 37, 
                cart: await CartService.createCart(),
                email: profile._json.email,
                password: "",
                role: 'user'
            }

            let result = await UserRepository.createUser(newUser);
            done(null, result); 
        } else {
            done(null, user); 
        }
    } catch (error) {
        return done(error);
    }
}))



export default initializePassport; 