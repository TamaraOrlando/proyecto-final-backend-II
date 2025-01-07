import UserDTO from "../dto/user.dto.js";
import UserRepository from "../repository/user.repository.js";
import CartService from "./cart.service.js"; 

//Nos traemos de util las funciones de bcrypt: 
import { createHash, isValidPassword } from "../utils/util.js";


class UserService {
    async registerUser(userData) {
        try {
            const existeUsuario = await UserRepository.getUserByEmail(userData.email);

            if (existeUsuario) throw new Error("El usuario ya existe");

            userData.password = createHash(userData.password);

            const nuevoCarrito = await CartService.createCart();
            userData.cart = nuevoCarrito._id;

            return await UserRepository.createUser(userData);
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            throw new Error("Error al registrar el usuario");
        }
    }

    async loginUser(email, password) {
        try {
            const user = await UserRepository.getUserByEmail(email);
            if (!user || !isValidPassword(password, user)) throw new Error("Error con las credenciales");
            return user;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw new Error("Error al iniciar sesión");
        }
    }

    async generarDTO(user) {
        try {
            const usuarioFinal = new UserDTO(user);
            return usuarioFinal;
        } catch (error) {
            console.error("Error al generar el DTO del usuario:", error);
            throw new Error("Error al generar el DTO del usuario");
        }
    }
}


export default new UserService(); 