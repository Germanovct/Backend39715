

import { Router } from "express";
import ProductManager from "../ProductManager.js";

const cartProducts = Router();
const productmanager = new ProductManager ();

let cart = [];

app.post("/api/user", (req, res) => {

    let cart = req.body;

    if (!productmanager.getProducts){

        return res
        .status(400)
        .send ({status: "ERROR" , error: "incomplete values"});
    }

   if (cars.length === 0){
    user.id = 1
   } else {
    user.id = users [users.length -1].id + 1;

   }
   
   users.push(user);
   return res.status (201).send ({ status : "Success" , message : "User created"});


});





export default cartProducts