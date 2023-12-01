import express from 'express';
import ProductsController from './controllers/ProductsController';
import AuthController from './controllers/AuthController';
import { ensureAuth } from './middlewares/auth';
import FavoritesController from './controllers/FavoritesController';
import UsersController from './controllers/UsersController';

const router = express.Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

router.get('/products', ProductsController.findProducts);
router.post('/products', ensureAuth, ProductsController.createProduct);
router.delete('/products', ensureAuth, ProductsController.deleteProduct);

router.get('/favorites', ensureAuth, FavoritesController.getFavoritedProducts);
router.post('/favorites', ensureAuth, FavoritesController.save);
router.delete('/favorites/:id', ensureAuth, FavoritesController.delete);

router.get('/users/current', ensureAuth, UsersController.userData);
router.put('/users/current', ensureAuth, UsersController.update);

export { router };
