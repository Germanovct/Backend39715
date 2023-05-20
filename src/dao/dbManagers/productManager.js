import { productModel } from "../models/product.model.js"

export default class productManager {
    constructor(){}


        findAll = async () =>{

            try{
         const products =  await productModel.find();
         return products;
            } catch (error){
                console.log(error);
            }

        };

        create = async (product) => {
            try {
                const createProduct = await productModel.create(product);
                return createProduct;
            } catch (error) {
             console.log(error);;
            }
        }
    
}