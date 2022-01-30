const express = require('express');
const ProductsService = require('../services/products.services');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.findOne(id);
      res.json(product);
    } catch(err){
      next(err);
    }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;

    const product = await service.create(body);

    res.status(201).json(product);
})

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const product = await service.update(id, body);

      res.json(product);
    } catch(err) {
      next(err);
    }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deletedId = await service.delete(id);

  res.json(deletedId);
})

module.exports = router;
