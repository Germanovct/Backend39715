import fs from "fs";

const path = './File/Carts.json';

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
      const products = await this.getProducts(id);
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
      const product = await manager.getProductById(productId);

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

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return cart;
    } catch (error) {
      console.log(error);
    }
  };
}