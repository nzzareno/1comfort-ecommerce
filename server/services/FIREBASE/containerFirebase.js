const { db } = require("./config");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);

class Container {
  constructor(collection) {
    this.colection = collection;
  }

  async findAll() {
    const collection = db
      .collection(this.colection)
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => doc.data()));
    return collection;
  }

  async find(id) {
    return await db
      .collection(this.colection)
      .doc(id)
      .get()
      .then((doc) => doc.data());
  }

  async save(data) {
    return await db.collection(this.colection).add({
      date: new Date().toLocaleString(),
      ...data,
    });
  }

  async update(id, data) {
    return await db.collection(this.colection).doc(id).update(data);
  }

  async deleteAll() {
    return db
      .collection(this.colection)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  }

  async deleteOne(id) {
    return await db.collection(this.colection).doc(id).delete();
  }
}

class ProductsFirebaseContainer extends Container {}

class CartFirebaseContainer extends Container {
  async save(data) {
    return await db
      .collection(this.colection)
      .doc()
      .set({
        date: new Date().toLocaleString(),
        products: [
          {
            id: Number(nanoid()),
            ...data,
          },
        ],
      });
  }

  async getOneProduct(idCart, idProduct) {
    return await db
      .collection(this.colection)
      .doc(idCart)
      .get()
      .then((doc) =>
        doc.data().products.find((product) => product.id === Number(idProduct))
      );
  }

  async getProducts(id) {
    return await db
      .collection(this.colection)
      .doc(id)
      .get()
      .then((doc) => doc.data().products);
  }

  async addProductAsignedById(idCart, idProduct) {
    return await db
      .collection(this.colection)
      .doc(idCart)
      .update({
        products: [
          ...(await this.getProducts(idCart)),
          { ...(await this.getOneProduct(idCart, idProduct.id)) },
        ],
      });
  }
  async deleteCart(id) {
    return await db.collection(this.colection).doc(id).delete();
  }

  async deleteOne(idCart, idProduct) {
    return await db
      .collection(this.colection)
      .doc(idCart)
      .update({
        products: (
          await this.getProducts(idCart)
        ).filter((product) => product.id !== Number(idProduct)),
      });
  }
}
module.exports = {
  Container,
  ProductsFirebaseContainer,
  CartFirebaseContainer,
};
