import express from "express";
import exphbs from "express-handlebars";
import "./database.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";


const app = express();
const PUERTO = 8080;


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));


// Configuración de Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


// Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


app.get('/', (req, res) => {
    return res.send('Proyecto Final - Programación Backend I');
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto http://localhost:${PUERTO}`);
});