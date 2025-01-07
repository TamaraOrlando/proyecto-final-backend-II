import UserService from "../services/user.service.js";
import jwt from "jsonwebtoken"; 
import config from "../config/config.js";


const JWT_SECRET = config.JWT_SECRET;



class UserController {
    async register(req, res) {
        const {first_name, last_name, email, age, password} = req.body; 

        try {
            
            const nuevoUsuario = await UserService.registerUser({first_name, last_name, email, age, password}); 

            const token = jwt.sign({
                user: `${nuevoUsuario.first_name} ${nuevoUsuario.last_name}`, 
                email: nuevoUsuario.email,
                role: nuevoUsuario.role,
                cart: nuevoUsuario.cart,
            }, JWT_SECRET, {expiresIn: "24h"}); 
            res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true}); 

            res.redirect("/api/sessions/current"); 

        } catch (error) {
            console.error("Error al registrar usuario:", error);
            res.status(500).send("Error en el server");
        }

    }

    async login(req, res) {
        const {email, password} = req.body; 
        try {
            const user = await UserService.loginUser(email, password); 

            const token = jwt.sign({
                user: `${user.first_name} ${user.last_name}`,
                _id: user._id.toString(),
                email: user.email,
                role: user.role,
                cart: user.cart,
            }, JWT_SECRET, {expiresIn: "24h"}); 

            res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true}); 

            res.redirect("/api/sessions/current"); 
        } catch (error) {
            res.status(500).send("Erro terrible, se suspende la navidad"); 
        }
    }

    async current(req, res) {
        if(req.user) { 

            const userDTO = await UserService.generarDTO(req.user); 
            console.log(req.user); 
            res.render("home", {user: userDTO}); 
            console.log(userDTO);

        } else {
            res.send("No autorizado"); 
        }
    }

    async logout(req, res) {
        res.clearCookie("coderCookieToken"); 
        res.redirect("/login"); 
    }

}

export default UserController; 