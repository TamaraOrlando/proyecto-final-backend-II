import express from "express";
import passport from "passport"; 
import CartController from "../controllers/cart.controller.js";

const router = express.Router();


router.get("/:cid", CartController.getCartById);
router.delete("/:cid", CartController.clearCart);
router.put("/:cid", CartController.updateCart);
router.post("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), CartController.addProduct);
  

export default router;