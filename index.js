const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from my express server!');
})

app.get('/new-route', (req, res) => {
  res.send({
    name: 'Product 1',
    price: 1000
  });
})

app.get('/products', (req, res) => {
  const products = [];

  const { size } = req.query;
  const limit = size || 10;

  for(let i = 0; i < limit; i++){
    products.push({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.imageUrl()
    })
  }

  res.json(products)
});

app.get

app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: 'Product 2',
    price: 1000
  })
})

app.get('/categories/:categoryId/products/:productsId', (req, res) => {
  const { categoryId, productsId } = req.params;

  res.json({
    categoryId,
    productsId
  })
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset){
    res.json({
      limit, offset
    })
  } else {
    res.send('There are no params')
  }

})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

