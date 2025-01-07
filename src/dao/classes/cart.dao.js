import CartModel from "../models/cart.model.js";

class CartDAO {
    async createCart() {
        try {
            const cart = new CartModel();
            return await cart.save();
        } catch (error) {
            throw new Error("Error al crear el carrito: " + error.message);
        }
    }

    async findCartById(cartId) {
        try {
            return await CartModel.findById(cartId).populate("products.product");
        } catch (error) {
            throw new Error("Error al buscar el carrito: " + error.message);
        }
    }

    async updateCart(cartId, updates) {
        try {
            return await CartModel.findByIdAndUpdate(cartId, updates, { new: true });
        } catch (error) {
            throw new Error("Error al actualizar el carrito: " + error.message);
        }
    }

    async deleteAllProducts(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) return null;
            cart.products = [];
            return await cart.save();
        } catch (error) {
            throw new Error("Error al eliminar productos del carrito: " + error.message);
        }
    }


}

export default new CartDAO();
