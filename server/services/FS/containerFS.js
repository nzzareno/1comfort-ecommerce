const fs = require("fs").promises;
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);

class Container {
  constructor(path) {
    this.path = path;
  }

  async fileInJSON() {
    let fileTxt = await fs.readFile(this.path, "utf-8");
    let type = JSON.parse(fileTxt);
    return type;
  }

  async fileSaving(item) {
    let type = JSON.stringify(item);
    await fs.writeFile(this.path, type);
  }

  async findAll() {
    const elements = await this.fileInJSON();
    return elements;
  }

  async save() {
    const savedElements = await this.findAll();
    const newElement = {
      id: Number(nanoid()),
      ...this.newElement,
    };
    savedElements.push(newElement);
    await this.fileSaving(savedElements);
    return newElement;
  }

  async find(id) {
    const elements = await this.fileInJSON();
    const element = elements.find((element) => element.id === Number(id));
    return element;
  }

  async update(id, data) {
    const elements = await this.fileInJSON();
    const element = await elements.find((element) => element.id === Number(id));
    const index = elements.indexOf(element);
    elements[index] = {
      ...element,
      ...data,
    };
    await this.fileSaving(elements);
    return elements[index];
  }

  async deleteOne(id) {
    const elements = await this.fileInJSON();
    const element = elements.find((element) => element.id === Number(id));
    const index = elements.indexOf(element);
    elements.splice(index, 1);
    await this.fileSaving(elements);
  }

  async deleteAll() {
    await this.fileSaving([]);
  }
}

class ProductosContainer extends Container {
  async save(data) {
    this.newElement = {
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
      genre: data.genre,
    };
    await super.save();
  }
}

class CartContainer extends Container {
  async save(data) {
    this.newElement = {
      date: new Date().toLocaleString(),
      products: [
        {
          id: Number(nanoid()),
          title: data.title,
          price: Number(data.price),
          image: data.image,
          description: data.description,
          stock: data.stock,
          date: new Date().toLocaleString(),
          code: data.code,
          category: data.category,
          new: data.new,
          genre: data.genre,
          logo: data.logo,
        },
      ],
    };
    await super.save();
    return this.newElement;
  }

  async getCarts() {
    const carts = await this.fileInJSON();
    return carts;
  }

  async update(id, carrito) {
    const cart = await this.find(id);
    const index = cart.products.indexOf(carrito);
    cart.products[index] = {
      ...carrito,
    };
    await this.fileSaving(cart);
    return cart.products[index];
  }

  async getProducts(idCarrito) {
    const cart = await this.find(idCarrito);
    return cart.products;
  }

  async getOneProduct(idCarrito, id) {
    const cart = await this.find(idCarrito);
    const product = cart.products.find((product) => product.id === Number(id));
    return product;
  }

  async addProductAsignedById(id, body) {
    const cart = await this.fileInJSON();
    const sameCart = cart.map((cart) => {
      if (cart.id === Number(id)) {
        cart.products.map((product) => {
          if (product.id === Number(body.id)) {
            cart.products.push(product);
          }
        });
      }
      return cart;
    });
    await this.fileSaving(sameCart);
    return sameCart;
  }

  async deleteCart(id) {
    const cart = await this.fileInJSON();
    const newCart = cart.filter((cart) => cart.id !== Number(id));
    await this.fileSaving(newCart);
    return newCart;
  }

  async deleteOne(id, id_prod) {
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
  }

  async deleteProducts(idCarrito) {
    const cart = await this.find(idCarrito);
    cart.products = [];
    await this.fileSaving(cart);
  }
}

module.exports = {
  Container,
  ProductosContainer,
  CartContainer,
};
