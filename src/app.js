import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";
import "./database.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js"
import viewsRouter from "./routes/views.router.js";
import ProductService from "./services/product.service.js";



const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static('./src/public'));


//Passport: 
app.use(passport.initialize());
initializePassport();


// Configuración de Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


// Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);




const PORT = config.PORT;

const httpServer = app.listen(PORT, () => { console.log(`Escuchando en el puerto http://localhost:${PORT}`) });

const socketServer = new Server(httpServer);


socketServer.on('connection', async (socket) => {

    console.log("nuevo cliente conectado")

    
    const products = await ProductService.getAllProductsWithoutPagination(); 

    console.log("Productos enviados al cliente:", products);  
    socket.emit('productos', products); 


    socket.on("addProduct", async (newProduct) => {
        try {
            
            const productToAdd = {
                title: newProduct.title,
                description: newProduct.description,
                price: newProduct.price,
                img: newProduct.img || "default-image.jpg",
                code: newProduct.code || `CODE${Date.now()}`,
                stock: newProduct.stock || 100,
                category: newProduct.category || "General"
            };
    
            
            await ProductService.createProduct(productToAdd);
            
            
            const productosActualizados = await ProductService.getAllProducts();

            console.log("Productos actualizados:", productosActualizados);

            socketServer.emit("productos", productosActualizados);
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    });
    
    socket.on("deleteProduct", async (productId) => {
        try {
            

            const objectId = new mongoose.Types.ObjectId(productId);
    
            
            await ProductService.deleteProduct(objectId);
            console.log("Producto eliminado correctamente");
    
            
            const productosActualizados = await ProductService.getAllProducts();
            socketServer.emit("productos", productosActualizados);

        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    });
    

});