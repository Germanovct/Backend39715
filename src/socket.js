import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager();
const products = await productManager.listProducts();

const socket = {};

socket.connect = function(httpServer) { 
    socket.io = new Server(httpServer);
    let { io } = socket;

    io.on("connection", (socket) => {
        console.log(`${socket.id} connected`);
        io.emit("products", products);
    });
};


export default socket;

