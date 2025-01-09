import CartService from "../services/cart.service.js";
import ProductService from "../services/product.service.js";
import UserRepository from "../repository/user.repository.js";
import ticketService from "../services/ticket.service.js";


//Controllers para las vistas:

class ViewsController {

    // Vista de productos home
    async getProducts(req, res) {

        const { limit = 3, page = 1, sort = null, category = null } = req.query;

        try {
            const filters = {
                limit: parseInt(limit),
                page: parseInt(page),
                sort,
                query: category,
            };

            console.log("Filters:", filters);

            const products = await ProductService.getAllProducts(filters);
            console.log("Products obtenidos:", products);

            const user = req.user;
            console.log("User data:", req.user); 

           
        if (!user || !user.cart) {
            console.log("No se encontró el cartId en el usuario:", user);
            return res.status(400).send("Cart ID no disponible en el usuario.");
        }


            const cartId = user.cart;
            console.log("Pasando cartId a la vista:", cartId);



            res.render('products', {
                productos: products.docs,
                cartId: req.user.cart,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                currentPage: products.page,
                totalPages: products.totalPages,
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: error.message });
        }
    };

    // vista para registrarse:
    getRegister(req, res) {
        res.render('register');
    };

    // vista para loguearse:
    getLogin(req, res) {
        res.render('login');
    };

    //vista para purchase:
    async purchaseView(req, res) {

        let purchaseComplete = []
        let purchaseError = []
        let precioTotal = 0

        console.log('User in request:', req.user);

        const userId = req.user._id;
        console.log('Usuario autenticado:', userId)

        try {
            const findUser = await UserRepository.getUserById(userId);
            if (!findUser) {
                throw new Error('Usuario no encontrado');
            }

            const cartId = findUser.cart;

            const cart = await CartService.getCartById(cartId)

            console.log('Cart found:', cart);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productsInCart = cart.products

            for (let product of productsInCart) {
                const idproduct = product.product
                const quantity = product.quantity
                const productInDB = await ProductService.getProductById(idproduct)
                console.log('Product in DB:', productInDB);

                if (quantity > productInDB.stock) {
                    purchaseError.push(product);

                }

                if (quantity <= productInDB.stock) {
                    let productUpdate = productInDB;
                    const quantityUpdate = productInDB.stock - quantity;
                    productUpdate.stock = quantityUpdate;
                    const update = await ProductService.updateProduct(idproduct, productUpdate)
                    purchaseComplete.push(product);
                    const monto = productInDB.price * quantity
                    precioTotal = precioTotal + monto

                }
            }


            // Solo creamos el ticket si hay productos en purchaseComplete
            if (purchaseComplete.length > 0) {
                const ticketData = {
                    amount: precioTotal,
                    purchaser: req.user.email
                }
                //creamos el ticket en la base de datos:
                const ticket = await ticketService.createTicket(ticketData);

                const purchaseData = {
                    ticketId: ticket._id,
                    amount: ticket.amount,
                    purchase_datetime: ticket.purchase_datetime,
                    purchaser: ticket.purchaser,
                    productosProcesados: purchaseComplete,
                }
                // Renderizamos la vista 'purchase' con los datos de la compra:
                console.log('Purchase data:', purchaseData);

                res.status(200).render('purchase', {
                    status: 'success',
                    payload: purchaseData,
                    cartId
                });


            } else {
                res.status(200).json({
                    status: 'error',
                    message: 'No se procesaron productos, por falta de stock.',
                    productosNoProcesados: purchaseError
                });

            }

        } catch (error) {

            console.error("Error:", error);
            res.status(400).render('error', {
                status: 'error',
                message: error.message
            });


        }

    }

    async getCart(req, res) {

        const cartId = req.params.cid;

        try {
            const cart = await CartService.getCartById(cartId);

            if (!cart) {
                console.log("No existe ese carrito con el id");
                return res.status(404).json({ error: "Carrito no encontrado" });
            }

            const productosEnCarrito = cart.products.map(item => ({
                product: item.product.toObject(),
                quantity: item.quantity
            }));


            res.render("carts", { productos: productosEnCarrito });

        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    };


    async getProductsByCategory(req, res) {
        try {
            const { category } = req.params;
            const productos = await ProductService.getProductsByCategory(category);


            const plainProducts = productos.map(product => product.toObject());

            if (!plainProducts || plainProducts.length === 0) {
                return res.status(404).json({ message: "No se encontraron productos en esta categoría" });
            }

            console.log({ plainProducts, category });
            res.render("products", { productos: plainProducts, category });

        } catch (error) {
            console.error("Error obteniendo productos por categoría:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }

    }


    async getRealTimeProducts(req, res) {
        try {
            const listaProductos = await ProductService.getAllProducts({});
            const user = req.user;
            const userAdmin = user.role === 'admin'
            const userObject = await UserRepository.getUserById(user._id);

            res.render('realTimeProducts', { listaProductos, user, userAdmin });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: error.message });
        }
    }
}

export default new ViewsController();