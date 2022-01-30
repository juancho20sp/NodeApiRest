const express = require('express');
const routerApi = require('./routes');
// const faker = require('faker');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from my express server!');
})

app.get('/new-route', (req, res) => {
  res.send({
    name: 'Product 1',
    price: 1000
  });
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

routerApi(app);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

