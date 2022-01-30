const express = require('express');
const routerApi = require('./routes');

const cors = require('cors');

const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('./middlewares/error.handler');
// const faker = require('faker');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options));

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

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

