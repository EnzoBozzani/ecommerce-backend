import express from 'express';
import ProductsController from './controllers/ProductsController';
import AuthController from './controllers/AuthController';
import { ensureAuth } from './middlewares/auth';

const router = express.Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

router.get('/products', ensureAuth, ProductsController.findProducts);

export { router };
