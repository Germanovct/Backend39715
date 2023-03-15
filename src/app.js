

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

app.get("/products/:productid"), async (req, res) => {
    getProductsById = async (prodId) => {
        const productos= await this.getProducts();
        const productoEncontrado = productos.find((e)=> e.id === Number(prodId));

        if(!productoEncontrado){
            return("producto no encontrado");
        }else{
        return productoEncontrado;
        }
    }};


app.listen(8080, ()=> {
    console.log("servidor en el puerto 8080");
});