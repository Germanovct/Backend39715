

import express from 'express';
import __dirname from './utilis.js';
import handlebars from "express-handlebars"
import socket from './socket.js';
import productRouter from './routes/products.router.js';
import cartProducts from './routes/cart.router.js';
import router from './routes/views.router.js';
import cartRouter from "./routes/cart.router.js";



const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(`${__dirname}/public`));



app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter)


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set("views", `${__dirname}/views`);

app.use("/", router);
export default app;

const httpServer = app.listen(8080, (req, res) => {
    console.log("Listening on port 8080");
  });

socket.connect(httpServer);