import express from 'express';
import ProductsController from './controllers/ProductsController';

const router = express.Router();

router.get('/products-by-price-ASC', ProductsController.findOrderedByPriceASC);

export { router };
