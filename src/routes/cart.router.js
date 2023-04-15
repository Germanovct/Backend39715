import { Router } from "express";
import CartManager from "../dao/FileManagers/CartManager.js";


const manager = new CartManager();

const router = Router();

router.post("/", async (req, res) => {
  const cart = req.body;
  if (!cart) {
    return res
      .status(400)
      .send({ status: "Error", error: "Cart could not be added" });
  }

  const newCart = await manager.addCart(cart);
  return res.send({
    status: "OK",
    message: "Cart added successfully",
    payload: newCart,
  });
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const cart = await manager.getCartById(+cartId);

  if (!cart) {
    return res.status(404).send({
      status: "Error",
      error: "cart was not found",
    });
  }
  return res.send({ status: "OK", message: "Cart found", payload: cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  const { quantity } = req.body;

  const newProduct = await manager.addProduct(+cartId, +productId, quantity);

  if (!newProduct) {
    return res
      .status(404)
      .send({ status: "Error", error: "Product could not be found" });
  }
  return res.send({
    status: "OK",
    message: "Product successfully added to the cart",
    payload: newProduct,
  });
});
router.get("/", async (req, res) => {
    const carts = await manager.getCarts();
    res.send(carts);
  });
  
  router.delete("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
  
    const result = await manager.removeProduct(cartId, productId);
  
    if (!result) {
      return res.status(404).send({
        status: "Error",
        error: "Product was not found in the cart",
      });
    }
    return res.send({
      status: "OK",
      message: "Product successfully removed from the cart",
      payload: result,
    });
  });
 

export default router;
