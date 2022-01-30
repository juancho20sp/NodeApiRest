const express = require('express');
const ProductsService = require('../services/products.services');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await service.findOne(id);
  res.json(product);
});

router.post('/', async (req, res) => {
  const body = req.body;

  const product = await service.create(body);

  res.status(201).json(product);
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const product = await service.update(id, body);

    res.json(product);
  } catch(err) {
    res.status(404).json({
      message: err.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deletedId = await service.delete(id);

  res.json(deletedId);
})

module.exports = router;
