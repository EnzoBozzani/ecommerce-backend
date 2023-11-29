import express from 'express';
import ProductsController from './controllers/ProductsController';

const router = express.Router();

router.get('/products', ProductsController.findProducts);

export { router };
