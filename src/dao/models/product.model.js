import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productCollection = "Product";

const productSchema = new mongoose.Schema ({
    title: {
        type: String,
        require: true,
    },
	description: {
        type: String,
        require: true,
    } ,
	price:{
        type: Number,
        require: true,
    },
	thumbnail:{
        type: String,
        require: true,
    },
    stock:{
        type: Number,
        require: true,
    },
	code:{
        type: String,
        unique: true,
    }
		
});

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection , productSchema);

export {productModel};