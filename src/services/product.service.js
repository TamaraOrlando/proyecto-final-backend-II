import ProductRepository from "../repository/product.repository.js";



class ProductService {
    async createProduct(data) {
        try {
            return await ProductRepository.create(data);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw new Error("Error al crear el producto");
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductRepository.getById(id);
            if (!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error);
            throw new Error("Error al obtener el producto por ID");
        }
    }

    async getAllProducts(filters) {
        try {
            return await ProductRepository.getAll(filters);
        } catch (error) {
            console.error("Error al obtener todos los productos:", error);
            throw new Error("Error al obtener todos los productos");
        }
    }

    async getAllProductsWithoutPagination() {
        try {
            return await ProductRepository.getAllWithoutPagination();
        } catch (error) {
            console.error("Error al obtener todos los productos sin paginación:", error);
            throw new Error("Error al obtener todos los productos sin paginación");
        }
    }

    async updateProduct(id, data) {
        try {
            const updated = await ProductRepository.update(id, data);
            if (!updated) throw new Error("Producto no encontrado para actualizar");
            return updated;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            throw new Error("Error al actualizar el producto");
        }
    }

    async deleteProduct(id) {
        try {
            const deleted = await ProductRepository.delete(id);
            if (!deleted) throw new Error("Producto no encontrado para eliminar");
            return deleted;
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw new Error("Error al eliminar el producto");
        }
    }

    async getProductsByCategory(category) {
        try {
            return await ProductRepository.getByCategory(category);
        } catch (error) {
            console.error("Error al obtener los productos por categoría:", error);
            throw new Error("Error al obtener los productos por categoría");
        }
    }
}


export default new ProductService();
