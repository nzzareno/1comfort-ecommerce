const mongoose = require("mongoose");

class Container {
  constructor(schema) {
    this.schema = schema;
  }

  async findAll() {
    return await this.schema.find();
  }

  async find(id) {
    const element = await this.schema.find({ _id: id });
    return element;
  }

  async save(data) {
    const newElement = new this.schema(data);
    return await newElement.save();
  }

  async update(id, data) {}

  async deleteAll() {
    await this.schema.deleteMany();
  }

  async deleteOne(id) {
    await this.schema.deleteOne({ _id: id });
  }
}

class ProductsMongoContainer extends Container {
  async update(id, data) {
    const element = await this.schema.updateOne(
      { _id: id },
      {
        title: data.title,
        price: data.price,
        image: data.image,
        description: data.description,
        stock: data.stock,
        code: data.code,
        category: data.category,
        new: data.new,
        logo: data.logo,
        genre: data.genre,
      }
    );
    return element;
  }
}

class CartMongoContainer extends Container {
  async getProducts(idCart) {
    const element = await this.schema.findOne({ _id: idCart });
    return element.products;
  }

  async save(data) {
    const element = new this.schema(data);

    const productos = [
      {
        id: mongoose.Types.ObjectId().toString(),
        title: data.title,
        price: data.price,
        image: data.image,
        description: data.description,
        stock: data.stock,
        code: data.code,
        category: data.category,
        new: data.new,
        logo: data.logo,
        genre: data.genre,
      },
    ];
    element.products = productos;
    await element.save();
    return element;
  }

  async deleteCart(idCart) {
    await this.schema.deleteOne({ _id: idCart });
  }

  async addProductAsignedById(idCart, body) {
    const element = await this.schema.findOne({ _id: idCart });
    const productos = element.products;
    const findProduct = await productos.find(
      (product) => product.id == body.id
    );
    productos.push(findProduct);
    await this.schema.updateOne({ _id: idCart }, { products: productos });
    return productos;
  }

  async deleteOne(idCart, idProduct) {
    const element = await this.schema.findOne({ _id: idCart });
    const index = element.products.indexOf(idProduct);
    element.products.splice(index, 1);
    await this.schema.updateOne(
      { _id: idCart },
      { products: element.products }
    );
  }
  async getOneProduct(idCart, idProduct) {
    const element = await this.schema.findOne({ _id: idCart });
    const product = element.products.find(
      (product) => product.id === idProduct
    );
    return product;
  }
}

module.exports = {
  ProductsMongoContainer,
  Container,
  CartMongoContainer,
};
