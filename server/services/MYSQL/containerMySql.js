const { knexConfig } = require("./config");
const knex = require("knex")(knexConfig);
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);

class Container {
  constructor(table) {
    this.table = table;
  }

  async findAll() {
    const element = await knex(this.table);
    return element;
  }

  async save(data) {
    return await knex(this.table).insert(data);
  }

  async find(id) {
    const element = await knex(this.table).where("id", id);
    return element;
  }

  async update(id, data) {
    const element = await knex(this.table).where("id", id).update(data);
    return element;
  }

  async getCarts() {
    const element = await knex(this.table);
    return element;
  }

  async deleteAll() {
    await knex(this.table).delete();
  }

  async deleteOne(id) {
    await knex(this.table).where("id", id).delete();
  }

  async getProducts(idCart) {
    const element = await knex(this.table).where("id", idCart);
    return element;
  }
}

class KnexProductsContainer extends Container {
  async find(id) {
    const element = await knex(this.table).where("id", id).select("*");
    return element;
  }

  async save(data) {
    try {
      await knex(this.table).insert(data);
    } catch (error) {
      console.log("FAIL " + error);
    }
  }

  async update(id, data) {
    const element = await knex(this.table).where("id", id).update(data);
    return element;
  }
}

class KnexCartContainer extends Container {
  async find(id) {
    const element = await knex(this.table).where("id", id).select("*");
    return element;
  }

  async getProducts(idCart) {
    const element = await knex(this.table).where("id", idCart).select("*");
    return element;
  }

  async save(data) {
    const carrito = {
      products: [],
    };

    carrito.products.push({
      product_id: data.product_id,
      date: data.date,
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
    });

    carrito.products = JSON.stringify(carrito.products);
    await knex(this.table).insert(carrito);
  }

  async update(id, data) {
    const element = await knex(this.table).where("id", id).update(data);
    return element;
  }
}

module.exports = { Container, KnexProductsContainer, KnexCartContainer };
