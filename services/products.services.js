const faker = require('faker');
const boom = require('@hapi/boom');
class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;

    for(let i = 0; i < limit; i++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl()
      })
  }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.products.push(newProduct);

    return newProduct;
  }

  find() {
    return new Promise((res) => {
      setTimeout(() => {
        res(this.products);
      }, 2500)
    })
    // return this.products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);

    if (!product){
      throw boom.notFound('Product not found');
    }

    if (product.isBlocked){
      throw boom.conflict('Product is blocked');
    }

    return product;
  }

  async update(id, changes) {
    const idx = this.products.findIndex(item => item.id === id);

    if (idx === -1) {
      throw boom.notFound('Product not found');
      // throw new Error('Product not found');
    }

    const product =  this.products[idx]
    this.products[idx] = {
      ...product,
      ...changes
    };

    return this.products[idx];
  }

  async delete(id) {
    const idx = this.products.findIndex(item => item.id === id);

    if (idx === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(idx, 1);

    return idx;
  }
}

module.exports = ProductsService;
