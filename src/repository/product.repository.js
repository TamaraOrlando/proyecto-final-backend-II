import ProductDAO from "../dao/classes/product.dao.js";


class ProductRepository {
    async create(product) {
        try {
            return await ProductDAO.add(product);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw new Error("Error al crear el producto");
        }
    }

    async getById(id) {
        try {
            return await ProductDAO.findById(id);
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error);
            throw new Error("Error al obtener el producto por ID");
        }
    }

    async getAll(filters) {
        try {
            return await ProductDAO.findAll(filters);
        } catch (error) {
            console.error("Error al obtener todos los productos:", error);
            throw new Error("Error al obtener todos los productos");
        }
    }

    async getAllWithoutPagination() {
        try {
            return await ProductDAO.findAllWithoutPagination();
        } catch (error) {
            console.error("Error al obtener todos los productos sin paginación:", error);
            throw new Error("Error al obtener todos los productos sin paginación");
        }
    }

    async update(id, product) {
        try {
            return await ProductDAO.updateById(id, product);
        } catch (error) {
            console.error("Error al actualizar el producto por ID:", error);
            throw new Error("Error al actualizar el producto por ID");
        }
    }

    async delete(id) {
        try {
            return await ProductDAO.deleteById(id);
        } catch (error) {
            console.error("Error al eliminar el producto por ID:", error);
            throw new Error("Error al eliminar el producto por ID");
        }
    }

    async getByCategory(category) {
        try {
            return await ProductDAO.findByCategory(category);
        } catch (error) {
            console.error("Error al obtener los productos por categoría:", error);
            throw new Error("Error al obtener los productos por categoría");
        }
    }
}

export default new ProductRepository();
