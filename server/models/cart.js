const fs = require("fs").promises;
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);

class Cart {
  constructor(txtNameFile) {
    this.txtNameFile = txtNameFile;
  }

  async fileInJSON() {
    try {
      const cart = await fs.readFile(this.txtNameFile);
      const cartJSON = JSON.parse(cart);
      return cartJSON;
    } catch (error) {
      console.log(error);
    }
  }

  async fileSaving(item) {
    let type = JSON.stringify(item);
    await fs.writeFile(this.txtNameFile, type);
  }

  async createCart(data) {
    try {
      const cart = await this.fileInJSON();

      const newCart = {
        id: Number(nanoid()),
        date: new Date().toLocaleString(),
        products: data.products?.map((product) => {
          return {
            id: Number(nanoid()),
            title: product.title,
            price: Number(product.price),
            image: product.image,
            description: product.description,
            stock: product.stock,
            date: new Date().toLocaleString(),
            code: product.code,
            category: product.category,
          };
        }),
      };
      cart.push(newCart);
      await this.fileSaving(cart);
      return newCart;
    } catch (error) {
      console.log("FAIL" + error);
    }
  }

  async getProductsInCart(id) {
    try {
      const cart = await this.fileInJSON();
      const getItems = cart.filter((cart) => cart.id === Number(id));
      for (let item in getItems) {
        return getItems[item].products;
      }
      return getItems;
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleProduct(id) {
    try {
      const cart = await this.fileInJSON();
      let arr = [];
      let obj = {};
      const newCart = cart.map((cart) => {
        return cart.products;
      });
      newCart.forEach((item) => {
        item.forEach((product) => {
          if (product.id === Number(id)) {
            arr.push(product);
          }
        });
      });
      obj.products = arr;
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(id, data) {
    try {
      const cart = await this.fileInJSON();
      const newCart = cart.map((cart) => {
        if (cart.id === Number(id)) {
          cart.products.push({
            id: Number(nanoid()),
            title: data.title,
            price: Number(data.price),
            image: data.image,
            description: data.description,
            stock: data.stock,
            date: new Date().toLocaleString(),
            code: data.code,
            category: data.category,
          });
        }
        return cart;
      });
      await this.fileSaving(newCart);
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProductAndCart(id, id_prod) {
    try {
      const cart = await this.fileInJSON();
      const newCart = cart.map((cart) => {
        if (cart.id === Number(id)) {
          cart.products = cart.products.filter(
            (product) => product.id !== Number(id_prod)
          );
        }
        return cart;
      });
      await this.fileSaving(newCart);
      return newCart;
    } catch (error) {
      console.log("FAIL" + error);
    }
  }

  async deleteCart(id) {
    try {
      const cart = await this.fileInJSON();
      const newCart = cart.filter((cart) => cart.id !== Number(id));
      await this.fileSaving(newCart);
      return newCart;
    } catch (error) {
      console.log("FAIL" + error);
    }
  }
}
module.exports = Cart;
