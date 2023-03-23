

import { Router } from "express";
import ProductManager from "../ProductManager.js";
import CartManager from "../CartManager.js";

const cartProducts = Router();
const productmanager = new ProductManager ();
const cartManager = new CartManager();
const router = Router();
const carts = await cartManager.listCarts();


router.post("/", async (req, res) => {
    try {
        const cart = {
            products: []
        };

        if (carts.length === 0) {
            cart.id = 1;
        } else {
        const lastCart = carts[carts.length - 1];
        if (lastCart.id === undefined) {
            return res
                .status(400)
                .send('El último carrito en la lista no tiene un ID');
        }
        cart.id = lastCart.id + 1;
        }
        cartManager.addCart(cart);

        return res
            .status(200)
            .send({status: `Success`, response: `Carrito creado con éxito.`});

    } catch (err) {
        return res
            .status(500)
            .send({status: `Error`, error: `Internal server error. Exception: ${err}`});;
    }
});

router.get("/:cartId", async (req, res) => {
    try {
        const cart = carts.find((c) => c.id === parseInt(req.params.cartId));
        if(!cart) return res.status(404).send({status: `Error`, error: `No se encontró el carrito.`});

        return res
            .status(200)
            .send(cart);
    } catch (err) {
        return res
            .status(500)
            .send({status: `Error`, error: `Internal server error. Exception: ${err}`});
    }
});
router.post("/:cartId/products/:productId", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cartId);
        const productId = parseInt(req.params.productId);

        const cart = carts.find((c) => c.id === cartId);
        const product = products.find((p) => p.id === productId);
        
        if(!cart) return res.status(404).send({status: `Error`, error: `No se encontró el carrito.`});
        if(!product) return res.status(404).send({status: `Error`, error: `No se encontró el producto`});

        const updateCart = {
            id: productId,
            quantity: req.body.quantity
        };

        cartManager.addCartProduct(updateCart, cartId);
        return res
            .status(200)
            .send({status: `Success`, message: `Producto añadido al carrito.`});
    } catch(err) {
        return res
            .status(500)
            .send({status: `Error`, error: `Internal server error. Exception: ${err}`});
    }
});


export default cartProducts;


