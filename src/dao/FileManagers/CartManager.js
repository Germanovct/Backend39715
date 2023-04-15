import fs from "fs";
import ProductManager from "./ProductManager.js";

const path = './File/Carts.json';
const productManager = new ProductManager();

export default class CartManager {

  getCarts = async () => {
    try {
      if (fs.existsSync(path)) {
        const cartsString = await fs.promises.readFile(path, "utf-8");
        const carts = JSON.parse(cartsString);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === id);
      if (!cart) throw new Error("cart was not found");
      const products = await this.getProductList(id);
      return {
        ...cart,
        products: products
      };
    } catch (error) {
      console.log(error);
    }
  };

  addCart = async (cart) => {
    try {
      const carts = await this.getCarts();
      cart = {
        id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
        products: [],
      };
      carts.push(cart);
      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (cartId, productId, quantity) => {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);
      const cart = await this.getCartById(cartId);
      const product = await productManager.getProductById(productId);

      if (!product || !cart) {
        throw new Error();
      }
      const { products } = cart;

      const productIndex = products.findIndex(
        (product) => product.productId === productId
      );

      const cartProduct = {
        productId,
        quantity,
      };

      if (productIndex === -1) {
        products.push(cartProduct);
      } else {
        products[productIndex].quantity += quantity;
      }

      carts.splice(cartIndex, 1, cart);

      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  getProductList = async (cartId) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cartId);

      if (!cart) {
        throw new Error("cart not found");
      }
      const productList = [];
      for (const item of cart.products) {
        const product = await productManager.getProductById(item.productId);
        if (product) {
          productList.push({ ...product, quantity: item.quantity });
        }
      }
      return productList;
    } catch (error) {
      console.log(error);
    }
  };
  
  removeProduct = async (cartId, productId) => {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);
      const cart = await this.getCartById(cartId);

      if (!cart) {
        throw new Error("cart not found");
      }
      const { products } = cart;

      const productIndex = products.findIndex(
        (product) => product.productId === productId
      );

      if (productIndex === -1) {
        throw new Error("product not found in cart");
      }
      products.splice(productIndex, 1);

      carts.splice(cartIndex, 1, cart);

      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}