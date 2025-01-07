import ProductService from "../services/product.service.js";

class ProductController {
    async create(req, res) {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const product = await ProductService.getProductById(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        console.log("Query Params:", req.query);
        try {
            const filters = {
                limit: parseInt(req.query.limit || 3),
                page: parseInt(req.query.page || 1),
                sort: req.query.sort,
                query: req.query.query,
            };
            const products = await ProductService.getAllProducts(filters);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
            res.json(updatedProduct);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await ProductService.deleteProduct(req.params.id);
            res.json({ message: "Producto eliminado exitosamente" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async getByCategory(req, res) {
        try {
            const products = await ProductService.getProductsByCategory(req.params.category);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new ProductController();
