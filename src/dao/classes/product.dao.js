import ProductModel from "../models/product.model.js";

class ProductDAO {
    async add(product) {
        try {

            return await ProductModel.create(product);
        } catch (error) {
            console.error("Error agregando producto:", error);
            throw new Error("Error agregando producto");
        }
    }

    async findById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            console.error("Error buscando producto por ID:", error);
            throw new Error("Error buscando producto por ID");
        }
    }

    async findAll({ limit = 3, page = 1, sort = null, query = null } = {}) {
        try {
            console.log("Parametros recibidos en findAll:", { limit, page, sort, query });

            const options = { page, limit, sort: sort ? { price: sort === "asc" ? 1 : -1 } : {} };
            const filter = query ? { category: query } : {};

            return await ProductModel.paginate(filter, { ...options, lean: true });

        }catch (error) {
            console.error("Error buscando productos:", error);
            throw new Error("Error buscando productos");
        }
    }

    async findAllWithoutPagination() {
        try {
            return await ProductModel.find();

        } catch (error) {
            console.error("Error buscando productos sin paginacion:", error);
            throw new Error("Error buscando productos sin paginacion");
        }
    }

    async updateById(id, product) {
        try {
            return await ProductModel.findByIdAndUpdate(id, product, { new: true });

        } catch (error) {

            console.error("Error actualizando producto:", error);
            throw new Error("Error actualizando producto");
        }
    }

    async deleteById(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);

        } catch (error) {
            console.error("Error borrando producto por ID:", error);
            throw new Error("Error borrando producto por ID");
        }
    }

    async findByCategory(category) {
        try {
            return await ProductModel.find({ category });

        } catch (error) {
            console.error("Error buscando productos por categoria:", error);
            throw new Error("Error buscando productos por categoria");
        }
    }
}

export default new ProductDAO();
