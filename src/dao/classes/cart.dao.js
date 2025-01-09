import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

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



    async addProductToCart(cid, pid) {
        try {
            
            const cart = await CartModel.findOne({_id: cid});
            if (!cart) throw new Error("Carrito no encontrado");

            

            const productToAdd = await ProductModel.findOne({_id: pid});
            if (!productToAdd) throw new Error("Producto no encontrado");

            
            const productIndex = cart.products.findIndex(item => item.product.toString() == productToAdd._id.toString());

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1; 
            } else {
                cart.products.push({ product: pid }) 
            }

            await CartModel.updateOne({_id: cid}, cart);
            return cart

        } catch (error) {
            throw new Error("Error al eliminar productos del carrito: " + error.message);
        }
    }
}

export default new CartDAO();
