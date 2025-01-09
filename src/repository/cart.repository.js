import CartDAO from "../dao/classes/cart.dao.js";

class CartRepository {
    async createCart() {
        try {
            return await CartDAO.createCart();
        } catch (error) {
            throw new Error("Error al crear el carrito: " + error.message);
        }
    }

    async findCartById(cartId) {
        try {
            return await CartDAO.findCartById(cartId);
        } catch (error) {
            throw new Error("Error al buscar el carrito: " + error.message);
        }
    }

    
    async updateCart(cartId, updates) {
        try {
            return await CartDAO.updateCart(cartId, updates);
        } catch (error) {
            throw new Error("Error al actualizar el carrito: " + error.message);
        }
    }

    
    async deleteCartProducts(cartId) {
        try {
            return await CartDAO.deleteAllProducts(cartId);
        } catch (error) {
            throw new Error("Error al eliminar productos del carrito: " + error.message);
        }
    }

    async addProductToCart(cid, pid) {

        try{
            return await CartDAO.addProductToCart(cid, pid);

        } catch (error) {

            throw new Error("Error al agregar producto al carrito: " + error.message);
        }
    }

}

export default new CartRepository();