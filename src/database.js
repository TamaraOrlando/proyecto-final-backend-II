import mongoose from "mongoose";
import config from "./config/config.js";


const MONGO_URL = config.MONGO_URL;


mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Conectado a MongoDB")
    })
    .catch((error) => {
        console.log("Tenemos un error: ", error)
    })