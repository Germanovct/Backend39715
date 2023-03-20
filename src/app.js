

import express from 'express';
import ProductManager from "./ProductManager.js";


const productmanager = new ProductManager ();


const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));





/*app.get ("/products", async (req, res) =>{
    const productid = req.params.productid;
    const usuario = await productmanager.getProducts();
    if (!usuario) return res.send ({ error: "Producto no encontrado"}); 
    res.send(usuario);
});*/


app.get("/products", async (req, res) => {
    const limit = parseInt(req.query.limit || 5);
  
    const products = await productmanager.getProducts();
    const result = products.slice(0, limit);
  
    res.send(result);
});



    app.get("/products/:productId", async (req, res) => {
    const productId = req.params.productId;
    const products = await productmanager.getProductsById(productId.toString());
    
    if (products.length === 0) return res.send({ error: 'Producto no encontrado' });
      
    res.send(products[0]);
  });
  

 /* let users = [];

  app.post("/api/user", (req, res) => {

    let user = req.body;

    if (!user.firstName || !user.secondName){

        return res
        .status(400)
        .send ({status: "ERROR" , error: "incomplete values"});
    }

   if (users.length === 0){
    user.id = 1
   } else {
    user.id = users [user.lengt -1].id + 1;
   }
   
   users.push(user);
   return res.status (201).send ({ status : "Success" , message : "User created"});


});

app.get ("/api/user", (req, res)=>{
    if (users.length === 0){
        return res 
        .status (404)
        .send ({ status: "ERROR", message: " There are not redistred"});
    }
    return res.status (200).send ({status: "OK", message: users});
})

app.put ("/api/user", (req, res)=>{
    const userId = req.params.id;
    const change = req.body;

    const userIndex = users.findIndex((u) => u.id == userId);

    if (userIndex === -1){
        return res.status(404).send({status: "ERROR", message: "User not found"});
    }
    if (change.id){
        return res
        .status(400)
        .send ({status: "Error", message: "Cannot update User id"});
    }
    const user = users [userIndex];
    const updateUser = {
        ...user,
        ...change,
    };
    users.splice(userIndex, 1, updateUser);
})*/

app.listen(8080, ()=> {
    console.log("servidor en el puerto 8080");
});