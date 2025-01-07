import CartService from "../services/cart.service.js";

class CartController {

    async getCartById(req, res) {
        try {
            const cart = await CartService.getCartById(req.params.cid);
            res.json(cart);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }


    async clearCart(req, res) {
        try {
            const cart = await CartService.clearCart(req.params.cid);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCart(req, res) {
        try {
            const cart = await CartService.updateCartProducts(req.params.cid, req.body.products);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new CartController();
