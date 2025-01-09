import CartService from "../services/cart.service.js";
import ProductService from "../services/product.service.js";

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

    

    async addProduct(req, res) {
        try {
        
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const userId = req.user._id;

          console.log("Cart ID:", cartId);  
        console.log("Product ID:", productId);  

        const product = await ProductService.getProductById(productId)
        console.log("Product fetched:", product);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
          }
    
    
          const updatedCart = await CartService.addProductToCart(cartId, productId);
    
          res.status(200).json(updatedCart);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }


}

export default new CartController();
