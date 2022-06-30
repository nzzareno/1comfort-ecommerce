const { knexConfig } = require("../../services/MYSQL/config");
const knex = require("knex")(knexConfig);

knex.schema
  .createTableIfNotExists("products", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.string("description");
    table.integer("price");
    table.integer("stock");
    table.string("image");
    table.string("code");
    table.string("category");
    table.boolean("new");
    table.timestamp("date").defaultTo(knex.fn.now());
    table.string("logo");
    table.string("genre");
  })
  .then(() => {
    return knex.schema.createTableIfNotExists("cart", (table) => {
      table.increments("idCart").primary();
      table.timestamp("dateCart").defaultTo(knex.fn.now());
      table.json("products");

      
      table.integer("product_id");
      table.string("title");
      table.string("description");
      table.integer("price");
      table.integer("stock");
      table.string("image");
      table.string("code");
      table.string("category");
      table.boolean("new");
      table.string("logo");
      table.string("genre");
    });
  })
  .catch((err) => {
    console.log("Error creating table:", err);
  });

module.exports = knex;
