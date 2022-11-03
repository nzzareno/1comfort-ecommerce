class productsDTO {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.description = product.description;
    this.code = product.code;
    this.quantity = product.quantity;
  }
}

module.exports = productsDTO;
