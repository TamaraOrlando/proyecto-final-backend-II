import express from "express";
import passport from "passport";
import ProductController from "../controllers/product.controller.js";
import CartController from '../controllers/cart.controller.js';

const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);
router.get("/category/:category", ProductController.getByCategory);


export default router;
