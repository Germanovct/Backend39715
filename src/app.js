

import express from 'express';
import ProductManager from "./ProductManager.js";

const productmanager = new ProductManager ();









const app = express ();



app.get ("/products", async (req, res) =>{
    const productid = req.params.productid;
    const usuario = await productmanager.getProducts(productid);
    if (!usuario) return res.send ({ error: "Producto no encontrado"}); 
    res.send(usuario);
});

app.get("/products/:productId", async (req, res) => {
    const productId = req.params.productId;
    const products = await productManager.getProductById(productId);
    
    if (!products) return res.status(404).send({ error: 'Producto no encontrado' });
    
    res.send(products);
  });
  


app.listen(8080, ()=> {
    console.log("servidor en el puerto 8080");
});