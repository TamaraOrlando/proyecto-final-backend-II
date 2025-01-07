import UserDao from "../dao/classes/user.dao.js";

class UserRepository {
    async createUser(userData) {
        try {
            return await UserDao.save(userData);
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            throw new Error("Error al crear el usuario");
        }
    }

    async getUserById(id) {
        try {
            return await UserDao.findById(id);
        } catch (error) {
            console.error("Error al obtener el usuario por ID:", error);
            throw new Error("Error al obtener el usuario por ID");
        }
    }

    async getUserByEmail(email) {
        try {
            return await UserDao.findOne({ email });
        } catch (error) {
            console.error("Error al obtener el usuario por correo electrónico:", error);
            throw new Error("Error al obtener el usuario por correo electrónico");
        }
    }
}


export default new UserRepository(); 