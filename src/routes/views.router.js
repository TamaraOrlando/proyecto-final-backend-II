import express from "express";
import passport from "passport";
import ViewsController from "../controllers/views.controller.js";
const router = express.Router();


import { verificarRol } from "../middleware/auth.js";

// Vista de productos
router.get("/products", passport.authenticate("jwt", {session: false}), verificarRol('user'), ViewsController.getProducts);

// Vista de productos por categoria
router.get("/products/category/:category", passport.authenticate("jwt", { session: false }), verificarRol('user'), ViewsController.getProductsByCategory);

// Vista de carrito
router.get("/carts/:cid", passport.authenticate("jwt", { session: false }), ViewsController.getCart);

// Vista purchase
router.get("/carts/:cid/purchase", passport.authenticate("jwt", { session: false }), ViewsController.purchaseView);

// Vista de registro
router.get("/register", ViewsController.getRegister);

// Vista de login
router.get("/login", ViewsController.getLogin);


// Vista realtimeproducts
router.get("/realtimeproducts", passport.authenticate("jwt", { session: false }),verificarRol('admin'), ViewsController.getRealTimeProducts);



export default router;