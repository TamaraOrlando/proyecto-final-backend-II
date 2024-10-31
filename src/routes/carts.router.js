import express from "express";
const router = express.Router();
import CartManager from "../managers/cart-manager.js";
const cartManager = new CartManager();
import CartModel from "../models/cart.model.js";


// Ruta GET que obtiene todos los carritos.

router.get("/", async (req, res) => {
    try {
        const carritos = await CartModel.find({});
        res.json(carritos);
    } catch (error) {
        console.error("Error al obtener los carritos", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Ruta POST que crea un nuevo carrito.

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Ruta GET que obtiene un carrito especifico por su ID.

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await CartModel.findById(cartId)

        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        return res.json(carrito.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Ruta POST agrega un producto específico a un carrito

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Ruta DELETE para eliminar todos los productos de un carrito

router.delete("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    try {
        const carrito = await CartModel.findById(cartId);
        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        carrito.products = [];

        await carrito.save();

        res.json({ message: "Todos los productos han sido eliminados del carrito" });

    } catch (error) {
        console.error("Error al eliminar todos los productos del carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});



// Ruta PUT para actualizar el carrito con un array de productos

router.put("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const nuevosProductos = req.body.products;
    try {
        const carrito = await CartModel.findById(cartId);
        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        carrito.products = nuevosProductos;

        await carrito.save();
        res.json({ message: "Carrito actualizado exitosamente" });

    } catch (error) {
        console.error("Error al actualizar el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});




export default router;
