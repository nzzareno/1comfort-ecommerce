class Container {
  constructor(schema) {
    this.schema = schema;
  }

  async findAll() {
    return this.schema.find();
  }

  async find(term) {
    const element = await this.schema.find({
      _id: term,
    });
    return element;
  }

  async save(data) {
    const newElement = new this.schema(data);
    return newElement.save();
  }

  async update(id, data) {
    await this.schema.updateOne({ _id: id }, data);
  }

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

  async find(id) {
    const element = await this.schema.findOne({
      _id: id,
    });
    return element;
  }

  async findByTerm(term) {
    const element = await this.schema.find({
      category: term,
    });

    const genre = await this.schema.find({
      genre: term,
    });

    return element.concat(genre);
  }

  async findByCategory (term) {
    const element = await this.schema.find({
      category: term,
    });
    return element;
  }
}

class CartMongoContainer extends Container {
  async getProducts(idCart) {
    const element = await this.schema.findOne({ _id: idCart });
    return element.products;
  }

  async save(data) {
    const newElement = new this.schema(data);
    newElement.qtyProducts = newElement.products.length;
    newElement.total = newElement.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    newElement.currency_type = "USD"
    return newElement.save();
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

class OrderMongoContainer extends Container {
  async getOrdersByUser(idUser) {
    const element = await this.schema.find({ user: idUser });
    return element;
  }

  async save(data) {
    const newElement = new this.schema(data);
    return newElement.save();
  }

  async update(idOrder, data) {
    const element = await this.schema.updateOne(
      { _id: idOrder },
      {
        status: data.status,
      }
    );
    return element;
  }

  async deleteOrder(idOrder) {
    await this.schema.deleteOne({ _id: idOrder });
  }

  async getOneOrder(idOrder) {
    const element = await this.schema.findOne({ _id: idOrder });
    return element;
  }

  async getAllOrders() {
    const element = await this.schema.find();
    return element;
  }

  async getOrderByUser(idUser) {
    const element = await this.schema.find({ user: idUser });
    return element;
  }
}

class MessagesMongoContainer extends Container {
  async save(data) {
    const newElement = new this.schema(data);
    return newElement.save();
  }

  async deleteAll() {
    await this.schema.deleteMany();
  }

  async deleteOne(id) {
    await this.schema.deleteOne({ _id: id });
  }

  async getMessages() {
    const element = await this.schema.find();
    return element;
  }

  async getMessage(id) {
    const element = await this.schema.findOne({ _id: id });
    return element;
  }

  async update(id, data) {
    const element = await this.schema.updateOne(
      { _id: id },
      {
        message: data.message,
      }
    );
    return element;
  }

  async getMessagesByUser(idUser) {
    const element = await this.schema.find({ user: idUser });
    return element;
  }


}

module.exports = {
  ProductsMongoContainer,
  Container,
  CartMongoContainer,
  OrderMongoContainer,
  MessagesMongoContainer,
};
