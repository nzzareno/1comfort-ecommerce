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
    return knex.schema.createTableIfNotExists("cart", (t) => {
      t.increments("idCart").primary();
      t.timestamp("dateCart").defaultTo(knex.fn.now());
      t.json("products");
      t.integer("product_id").unsigned().defaultTo(0);
      t.timestamp("date").defaultTo(knex.fn.now());
      // t.foreign("product_id").references("id").inTable("products");
    });
  })
  .catch((err) => {
    console.log("Error creating table:", err);
  });

module.exports = knex;
