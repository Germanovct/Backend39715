import { Router } from "express";
import {uploader} from "../utils.js";

const router = Router();


let users = [];

router.get("/", (req, res) => {

    let user = req.body;

    if (!user.firstName || !user.secondName){

        return res
        .status(400)
        .send ({status: "ERROR" , error: "incomplete values"});
    }

   if (user.lengt === 0){
    user.id = 1
   } else {
    user.id = users [user.lengt -1].id + 1;
   }
   
   user.push(user);
   return res.status (201).send ({ status : "Success" , message : "User created"});


});





















export default router;