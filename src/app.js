

const express = require ("express");
const { producto } = require("./products.js");

const products= [ 
    {
        id: "1",
    nombre: "Woo York - Dystopian EP",
    descripcion: "Vinyl",
    price: "100USD",
    code: "VA003",
    thumbnail: "https://semanticarecords.bandcamp.com/album/frozen-lake-semantica-84",
    stock: "100",
   
},
{
    id: "2",
    nombre: "Kike Pravda - Reverberation",
    descripcion: "Vinyl",
    price: "190USD",
    code: "VA002",
    thumbnail: "https://semanticarecords.bandcamp.com/album/reverberation-semantica-145",
    stock: "200",


},
{
    id: "3",
    nombre: "Ribe - El Camino",
    descripcion: "Vinyl",
    price: "400USD",
    code: "VA001",
    thumbnail: "https://semanticarecords.bandcamp.com/album/el-camino-ep-semantica-149",
    stock: "50",


},
{
    id: "4",
    nombre: "Germano - Manush",
    descripcion: "Vinyl",
    price: "500USD",
    code: "VA004",
    thumbnail: "https://vctlabel.bandcamp.com/album/equilibrium-line",
    stock: "150",


},

];



const app = express ();

app.get ("/products", (req, res) =>{
    res.send(products);
});

app.get ("/products/:productid", (req, res) =>{
    const productid = req.params.productid;
    const producto = products.find((u) => u.id === productid);
    if (!producto) return res.send ({ error: "Producto no encontrado"}); 
    res.send(producto);
});



app.listen(8080, ()=> {
    console.log("servidor en el puerto 8080");
});