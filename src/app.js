

import express from 'express';
import __dirname from './utilis.js';
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import handlebars from "express-handlebars";
import socket from './socket.js';
import productRouter from './routes/products.router.js';
import router from './routes/views.router.js';
import cartRouter from "./routes/cart.router.js";






const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(`${__dirname}/public`));



app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter)
app.use("/", router);


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set("views", `${__dirname}/views`);


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@codercluster.dj59888.mongodb.net/Products?retryWrites=true&w=majority`)

export default app;

const httpServer = app.listen(8080, (req, res) => {
    console.log("Listening on port 8080");
  });

socket.connect(httpServer);