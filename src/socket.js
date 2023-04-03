import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';
import { io } from "socket.io-client";

const productManager = new ProductManager();
const products = await productManager.listProducts();


const socket = {};

socket.connect = function(httpServer) { 
    socket.io = new Server(httpServer);
    let { io } = socket;

    io.on("connection", (socket) => {
        console.log(`${socket.id} conectado`);
        io.emit("products", products);
    });
};


export default socket;

