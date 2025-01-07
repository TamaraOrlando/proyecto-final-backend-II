import express from "express";
import CartController from "../controllers/cart.controller.js";

const router = express.Router();


router.get("/:cid", CartController.getCartById);
router.delete("/:cid", CartController.clearCart);
router.put("/:cid", CartController.updateCart);

export default router;