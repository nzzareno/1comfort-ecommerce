const fs = require("fs").promises;
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);

class Products {
  constructor(txtNameFile) {
    this.txtNameFile = txtNameFile;
  }

  async fileInJSON() {
    let fileTxt = await fs.readFile(this.txtNameFile, "utf-8");
    let type = JSON.parse(fileTxt);
    return type;
  }

  async fileSaving(item) {
    let type = JSON.stringify(item);
    await fs.writeFile(this.txtNameFile, type);
  }

  async getProducts() {
    try {
      const productos = await this.fileInJSON();
      return productos;
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(id) {
    try {
      const productos = await this.fileInJSON();
      const producto = productos.find((producto) => producto.id === Number(id));
      return producto;
    } catch (error) {
      console.log(error);
    }
  }

  async createProducts(data) {
    try {
      const productos = await this.fileInJSON();
      const newProduct = {
        id: Number(nanoid()),
        price: Number(data.price),
        title: data.title,
        date: new Date().toLocaleString(),
        description: data.description,
        stock: data.stock,
        code: data.code,
        image: data.image,
        category: data.category,
        new: data.new,
        logo: data.logo,
        men: data.men,
        women: data.women,
      };

      productos.push(newProduct);
      await this.fileSaving(productos);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productos = await this.fileInJSON();
      const producto = productos.find((producto) => producto.id == id);
      const index = productos.indexOf(producto);
      productos.splice(index, 1);
      await this.fileSaving(productos);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProducts() {
    try {
      await this.fileSaving([]);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProducts() {
    try {
      await this.fileSaving([]);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, data) {
    try {
      const productos = await this.fileInJSON();
      const producto = productos.find((producto) => producto.id == id);
      const index = productos.indexOf(producto);
      productos[index] = {
        ...producto,
        ...data,
      };
      await this.fileSaving(productos);
      return productos[index];
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Products;
