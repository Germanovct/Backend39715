

import express from 'express';
import ProductManager from "./ProductManager.js";

const productmanager = new ProductManager ();


const app = express ();



app.get ("/products", async (req, res) =>{
    const productid = req.params.productid;
    const usuario = await productmanager.getProducts();
    if (!usuario) return res.send ({ error: "Producto no encontrado"}); 
    res.send(usuario);
});

app.get("/products/:productId", async (req, res) => {
    const productId = req.params.productId;
    const products = await productmanager.getProductsById(productId.toString());
    
    if (products.length === 0) return res.send({ error: 'Producto no encontrado' });
      
    res.send(products[0]);
  });
  


app.listen(8080, ()=> {
    console.log("servidor en el puerto 8080");
});