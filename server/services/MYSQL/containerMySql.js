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
    // const newCart = {
    //   idCart: Number(nanoid()),
    //   products: [],
    // };

    // newCart.products.push({
    //   product_id: Number(nanoid()),
    //   title: data.title,
    //   price: data.price,
    //   logo: data.logo,
    //   stock: data.stock,
    //   description: data.description,
    //   category: data.category,
    //   genre: data.genre,
    //   image: data.image,
    //   code: data.code,
    // });

    // await knex(this.table).insert(newCart);
    // return newCart;
    const newCart = {
      idCart: Number(nanoid()),
      products: [],
    };

    newCart.products.push({
      product_id: Number(nanoid()),
      title: data.title,
      price: data.price,
      logo: data.logo,
      stock: data.stock,
      description: data.description,
      category: data.category,
      genre: data.genre,
      image: data.image,
      code: data.code,
    });
    console.log(newCart) // Esto es lo que me deberia devolver
    await knex(this.table).insert(newCart); // Esto tira error, creo que es por que me falta una relacion, o algo de la clave foreana, no supe como implementarlo

  }

  async update(id, data) {
    const element = await knex(this.table).where("id", id).update(data);
    return element;
  }
}

module.exports = { Container, KnexProductsContainer, KnexCartContainer };
