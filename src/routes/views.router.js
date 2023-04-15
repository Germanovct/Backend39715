import { Router } from "express";
import ProductManager from "../dao/FileManagers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

const products = await productManager.getProducts();

router.get("/", async (req, res) => {
  res.render("home", { products, style: "styles.css", title: "VCT" });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products, style: "styles.css", title: "VCT" });
});

export default router;