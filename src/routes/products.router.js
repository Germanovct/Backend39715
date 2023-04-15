import  Router  from "express";
/*import socket from '../socket.js';*/

import ProductManager from "../dao/dbManagers/productManager.js";



const productManager = new ProductManager ();
const router = Router();

router.get ("/", async (req, res) =>{
  const products = await ProductManager.findAll();
  return products;
});

router.post("/", async (req, res) => {
  const { title, description, price, thumbnail, stock, code } = req.body;

  if (!title || !description || !price || !thumbnail || !stock || !code) {
    return res.status(400).send({ error: "Todos los campos son obligatorios" });
  }

  const newProduct = await productmanager.createProduct(req.body);
  res.send(newProduct);
});



/*router.get ("/", async (req, res) =>{
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
  const product = await productmanager.getProductsById(productId);
  res.send(product);
});



router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, stock, code } = req.body;
  
    if (!title || !description || !price || !thumbnail || !stock || !code) {
      return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }
  
    const newProduct = await productmanager.createProduct(req.body);
    res.send(newProduct);
  });


router.put("/:productId", async (req, res) => {
    const productId = req.params.productId;
    const updatedProduct = await productmanager.updateProduct(req.body);
    if (updatedProduct.length === 0) return res.send({ error: `Producto con id ${productId} no encontrado` });
    res.send(updatedProduct);
  });
  

  router.delete("/:productId", async (req, res) => {
    const productId = req.params.productId;
    const deletedProduct = await productmanager.deleteProduct(productId);
    if (deletedProduct.length === 0) return res.send({ error: `Producto con id ${productId} no encontrado` });
    res.send(deletedProduct);
  });

  router.get('/realTimeProducts', async (req, res) => {
    const products = await productmanager.getProducts();
    res.render('realTimeProducts', { products });
  });

  router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
});


router.post("/", async (req, res) => {
  const { title, price, thumbnail } = req.body;

  try {
    const newProduct = await ProductService.createProduct({
      title,
      price,
      thumbnail,
    });
  
    // Emitimos el evento 'newProduct' a través del socket
    socket.emit("newProduct", newProduct);
    
    return res.status(201).send(newProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
});*/

export default router;
