import { Router } from "express";
import ProductManager from "../dao/FileManagers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

const products = await productManager.getProducts();

router.get("/", async (req, res) => {
  res.render("home", { products, style: "styles.css", title: "VCT" });
});

router.get("/api/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({
      success: true,
      payload: {
        products
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los productos"
    }).render(products);
  }
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products, style: "styles.css", title: "VCT" });
});




router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/createCookie", async (req, res) => {
  const data = req.body;

  res.cookie("NewCookie", data, {maxAge: 10000}).send({ status: "Success", message: "Cookie Created"})
});

export default router;