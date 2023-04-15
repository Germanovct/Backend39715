import { productModel } from "../models/product.model.js"

export default class productManager {
    constructor(){}


        findAll = async () =>{

            try{
         const product =  await productModel.find();
         return products;
            } catch (error){
                console.log(error);
            }

        }
    
}