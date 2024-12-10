import express from "express";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import "./database.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js"
import viewsRouter from "./routes/views.router.js";


const app = express();
const PUERTO = 8080;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(express.static("./src/public"));


//Passport: 
app.use(passport.initialize());
initializePassport();


// Configuración de Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


// Rutas: 
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);



app.get('/', (req, res) => {
    return res.send('Primera pre-entrega - Programación Backend II');
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto http://localhost:${PUERTO}`);
});