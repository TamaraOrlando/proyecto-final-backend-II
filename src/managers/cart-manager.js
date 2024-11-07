import CartModel from "../models/cart.model.js";


class CartManager {

    async crearCarrito(cartId = `carrito_${Date.now()}`) {
        try {
            const nuevoCarrito = new CartModel({ _id: cartId, products: [] });
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear el nuevo carrito de compras.", error);
            throw error;
        }
    }


    async getCarritoById(cartId) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return null;
            }

            return carrito;
        } catch (error) {
            console.log("Error al traer el carrito", error);
        }
    }




    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {

            let carrito = await this.getCarritoById(cartId);

            if (!carrito) {
                console.log(`No existe el carrito. Creando uno nuevo con ID: ${cartId}`);
                carrito = new CartModel({ _id: cartId, products: [] });
            }

            const existeProducto = carrito.products.find(item => item.product.toString() === productId);
            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productId, quantity });
            }

            carrito.markModified("products");
            await carrito.save();

            console.log(`Carrito guardado: ${carrito}`);

            return carrito;

        } catch (error) {
            console.log("error al agregar un producto", error);
        }
    }




    async eliminarProductoDelCarrito(cartId, productId) {
        try {
            const carrito = await this.getCarritoById(cartId);
            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return null;
            }
            carrito.products = carrito.products.filter(item => item.product.toString() !== productId);
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("Error al eliminar un producto del carrito", error);
        }
    }


    async eliminarTodosLosProductosDelCarrito(cartId) {
        try {
            const carrito = await this.getCarritoById(cartId);
            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return null;
            }
            carrito.products = [];
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("Error al eliminar todos los productos del carrito", error);
        }
    }



    async actualizarCarrito(cartId, products) {
        try {
            const carrito = await this.getCarritoById(cartId);
            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return null;
            }
            carrito.products = products;
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("Error al actualizar el carrito", error);
        }
    }



    async actualizarCantidadProducto(cartId, productId, quantity) {
        try {
            const carrito = await this.getCarritoById(cartId);
            const existeProducto = carrito.products.find(item => item.product.toString() === productId);
            if (existeProducto) {
                existeProducto.quantity = quantity;
            } else {
                console.log("Producto no encontrado en el carrito");
                return null;
            }
            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("Error al actualizar la cantidad del producto", error);
        }
    }
}



export default CartManager;