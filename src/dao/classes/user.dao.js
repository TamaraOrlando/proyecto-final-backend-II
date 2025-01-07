import UserModel from "../models/user.model.js";


class UserDao {
    async findById(id) {
        try {
            return await UserModel.findById(id);
        } catch (error) {
            console.error("Error al obtener el usuario por ID:", error);
            throw new Error("Error al obtener el usuario por ID");
        }
    }

    async findOne(query) {
        try {
            return await UserModel.findOne(query);
        } catch (error) {
            console.error("Error al obtener el usuario con la consulta:", error);
            throw new Error("Error al obtener el usuario con la consulta");
        }
    }

    async save(userData) {
        try {
            const user = new UserModel(userData);
            return await user.save();
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
            throw new Error("Error al guardar el usuario");
        }
    }
}

export default new UserDao(); 