

import fs from "fs";

const path = './File/Productos.json';

export default class ProductManager {


    getProducts = async () => {
        if(fs.existsSync (path)) {
            const data = await fs.promises.readFile (path, "utf-8");
            const result = JSON.parse(data);
            console.log(result);
            return result;
        } 
        else {
            return [] ;
        };

    };


    addProduct = async (producto) => {
        const productos = await this.getProducts ();
        if (!producto.title || !producto.descripcion || !producto.price || !producto.thumbnail || !producto.stock || !producto.code){
            console.error ( 'Campos Obligatorios');
            return;
        };
        const productCode = productos.findIndex((prod) =>prod.code === producto.code);
        if(productCode !== -1){
            console.log(`Ya existe el producto con el code : ${producto.Code}`);
            return;
        }
        if (productos.length === 0){
            producto.id =1;
        }
        else{
            producto.id =  productos [productos.length -1].id + 1;
        }
        productos.push(producto);
        await fs.promises.writeFile (path, JSON.stringify(productos, null, '\t'));
        return producto
    };
    getProductsById = async (prodId) => {
        const productos= await this.getProducts();
        const productoEncontrado = productos.find((e)=> e.id === Number(prodId));

        if(!productoEncontrado){
            return("producto no encontrado");
        }else{
        return productoEncontrado;
        };
    }


     

    updateProduct = async (productoUpdate) => {
        if (fs.existsSync(path)){
            console.log ( "Modificar Producto");
            const productos = await this.getProducts();
            const indiceproducto = productos.findIndex(producto => producto.id === productoUpdate.id);

            if (indiceproducto === -1) {
                console.log(`Producto con id ${productoUpdate.id}`)
                return [] 
            }
            else{
                productoUpdate.id ??= productos[indiceproducto].id;
                productoUpdate.nombre ??= productos[indiceproducto].nombre;
                productoUpdate.descripcion ??= productos[indiceproducto].descripcion;
                productoUpdate.price ??= productos[indiceproducto].price;
                productoUpdate.stock ??= productos[indiceproducto].stock;

                productos [indiceproducto] = productoUpdate;

                await fs.promises.writeFile(path, JSON.stringify(productos, null, "\t"));
                console.log(productos);
                return productos;
            }
        }

    }

    deleteProduct = async (id) => {
        if (fs.existsSync (path)){
            console.log ("Eliminar Producto");
            const productos =await this.getProducts();
            const indiceproducto = productos.findIndex(producto=> producto.id === id);

            if (indiceproducto === -1){
                console.log(`Producto con id ${id} no existe`);
                return []; 
            }
            else{
                for (var i = 0; i < productos.length; i++){
                    if (productos [i].id === id ){
                        productos.splice(i,1);
                        i--;
                    }
                }
                await fs.promises.writeFile(path, JSON.stringify(productos, null, "\t"));
                return productos;
            }
        }

    }
}
