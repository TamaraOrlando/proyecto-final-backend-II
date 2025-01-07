import CartRepository from "../repository/cart.repository.js";

class CartService {
    async createCart() {
        try {
            const cart = await CartRepository.createCart(); 
            return cart;
        } catch (error) {
            throw new Error("Error al crear el carrito: " + error.message);
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartRepository.findCartById(cartId);
            return cart;
        } catch (error) {
            throw new Error("Error al obtener el carrito: " + error.message);
        }
    }


    async clearCart(cid) {
        try {
            const cart = await CartRepository.findCartById(cid);
            cart.products = []; 
            return await cart.save();
        } catch (error) {
            throw new Error("Error al limpiar el carrito: " + error.message);
        }
    }

    

    async updateCartProducts(cid, products) {
        try {
            const cart = await CartRepository.findCartById(cid);
            cart.products = products; 
            return await cart.save();
        } catch (error) {
            throw new Error("Error al actualizar productos en el carrito: " + error.message);
        }
    }

}

export default new CartService();