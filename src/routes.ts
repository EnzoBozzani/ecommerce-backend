import express from 'express';
import ProductsController from './controllers/ProductsController';
import AuthController from './controllers/AuthController';
import { ensureAuth } from './middlewares/auth';
import FavoritesController from './controllers/FavoritesController';
import UsersController from './controllers/UsersController';
import AdminController from './controllers/AdminController';
import multer from 'multer';
import PaymentController from './controllers/PaymentController';

const upload = multer();
const router = express.Router();

router.post('/admin/auth/login', AdminController.login);
router.get('/admin/users', ensureAuth, AdminController.usersList);
router.get('/admin/purchases', ensureAuth, AdminController.getAllPurchases);
router.get('/admin/products', ensureAuth, AdminController.getAllProducts);
router.post('/admin/products', ensureAuth, upload.array('images', 3), AdminController.createProduct);
router.delete('/admin/products', ensureAuth, AdminController.deleteProduct);
router.put('/admin/products', ensureAuth, upload.array('images', 3), AdminController.updateProduct);

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

router.get('/products', ProductsController.findProducts);
router.get('/products/featured', ProductsController.getFeaturedProducts);

router.get('/favorites', ensureAuth, FavoritesController.getFavoritedProducts);
router.post('/favorites', ensureAuth, FavoritesController.save);
router.delete('/favorites/:id', ensureAuth, FavoritesController.delete);

router.get('/users/current', ensureAuth, UsersController.userData);
router.get('/users/current/purchases', ensureAuth, UsersController.getAllPurchases);
router.put('/users/current', ensureAuth, UsersController.update);
router.put('/users/current/password', ensureAuth, UsersController.updatePassword);

router.post('/payment', ensureAuth, PaymentController.buyProduct);

export { router };
