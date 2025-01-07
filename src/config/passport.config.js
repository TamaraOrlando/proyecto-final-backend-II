import passport from "passport";
import jwt from "passport-jwt"; 
import config from "./config.js";


const JWT_SECRET = config.JWT_SECRET;


console.log("JWT_SECRET:", JWT_SECRET);

const JWTStrategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt; 



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

const cookieExtractor = req => {
    let token = null; 
     
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]; 
        console.log("Token extraído:", token);
    }
    return token; 
}

export default initializePassport; 