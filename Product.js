

import ProductManager from './ProductManager.js';

const manager = new ProductManager();

const env = async () => {
    let primeraConsulta = await manager.getProducts();
    console.log(primeraConsulta);

    const producto = {
        nombre: "Woo York - Dystopian EP",
        descripcion: "Vinyl",
        price: "100USD",
        code: "VA003",
        thumbnail: "https://semanticarecords.bandcamp.com/album/frozen-lake-semantica-84",
        stock: "100"

    };

    let result = await manager.addProduct(producto);
    console.log(result);



};
env ();