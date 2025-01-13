import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        index: true,
        unique: true
    },

    age: {
        type: Number,
        required: true
    },

    password: {
        type: String
    },

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
})


const UserModel = mongoose.model("users", userSchema);

export default UserModel;