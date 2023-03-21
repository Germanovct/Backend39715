import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productmanager = new ProductManager ();

router.get ("/", async (req, res) =>{
    const productid = req.params.productid;
    const usuario = await productmanager.getProducts();
    if (!usuario) return res.send ({ error: "Producto no encontrado"}); 
    res.send(usuario);
});

router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit || 5);
  
    const products = await productmanager.getProducts();
    const result = products.slice(0, limit);
  
    res.send(result);
});

router.get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    const products = await productmanager.getProductsById(productId.toString());
    
    if (products.length === 0) return res.send({ error: 'Producto no encontrado' });
      
    res.send(products[0]);
});

export default router;
