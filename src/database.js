import mongoose from "mongoose";


mongoose.connect("mongodb+srv://tamilyn07:backend@cluster0.xzfsg.mongodb.net/Backend-I?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Conectado a MongoDB")
    })
    .catch((error) => {
        console.log("Tenemos un error: ", error)
    })