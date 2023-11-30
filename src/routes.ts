import express from 'express';
import ProductsController from './controllers/ProductsController';
import AuthController from './controllers/AuthController';

const router = express.Router();

router.get('/products', ProductsController.findProducts);
router.post('/auth/register', AuthController.register);

export { router };
