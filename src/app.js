

import express from 'express';
import __dirname from './utilis.js';
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import handlebars from "express-handlebars";
import socket from './socket.js';
import productRouter from './routes/products.router.js';
import viewsrouter from './routes/views.router.js';
import cartRouter from "./routes/cart.router.js";
import { productModel } from './dao/models/product.model.js';
import session from "express-session";
import cookieParser from 'cookie-parser'





const app = express ();
//Middlewares//
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(`${__dirname}/public`));



//Routes//
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter)
app.use("/", viewsrouter);


//Cookies//
app.use(cookieParser("CLave12$#"))
app.use("/api/setCookie",   (req,res) =>{res.cookie("WebCookie", "Una cookie compleja", {signed: true}).send("Coockie Created")});
app.get("/getCookies" , (req, res) =>{res.send(req.signedCookies)});
app.get("/deleteCookies", (req,res) =>{res.clearCookie("WebCookie").send("Cookie Deleted")});

//Sessions//
app.use (session({
  secret:'secrectCoder',
  resave: true,
  saveUninitialized: true,
}))
app.get('/session', (req,res)=>{
  if(req.session.counter){
    req.session.counter++;
    res.send (`Se ha visitado el sitio ${req.session.counter} veces.`)
  }
  else{
    req.session.counter=1;
    res.send('Bienvenido!!')
  }
});
app.get('/logout' , (req, res) =>{
  req.session.destroy( err => {
    if (!err) res.send ('Logout Ok!')
    else res.send ({status: 'Logout ERROR', body: err})
  })
});
app.get('/log' , (req, res) => {
  const { username, password} = req.query;
  if (username !== "pepe" || password !== "pepepass"){
    res.send ('Login Failed');
  }
  req.session.user = username;
  req.session.admin= true;
  res.send ('Login Successful');
});
function auth (req, res, next) {
  if (req.session?.user === 'pepe' && req.session?.admin){
    return next();
  }
  return res.status (401).send('error de autorizacion')
};
app.get ('/privado' , auth, (req, res) =>{
  res.send ('Si estas viendo esto es porque ya te logueaste')
});

//template engines//
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set("views", `${__dirname}/views`);



const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const environment = async () =>{
 await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@codercluster.dj59888.mongodb.net/${dbName}?retryWrites=true&w=majority`);


};

export default app;

const httpServer = app.listen(8080, (req, res) => {
    console.log("Listening on port 8080");
    console.log("ENJOY")
  });

  environment();


socket.connect(httpServer);