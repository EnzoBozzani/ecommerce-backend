import { AuthenticatedRequest } from '../middlewares/auth';
import UsersService from '../services/UsersService';
import { Request, Response } from 'express';
import ProductsService from '../services/ProductsService';
import JWTService from '../services/JWTService';
import uploadFiles from '../helpers/uploadFiles';
import deleteFolder from '../helpers/deleteFolder';
import PurchaseService from '../services/PurchaseService';
import FavoriteService from '../services/FavoriteService';

export default class AdminController {
	static async getAllProducts(req: AuthenticatedRequest, res: Response) {
		try {
			const isAdmin = await UsersService.isAdmin(req.user!);
			if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
			const productsList = await ProductsService.getAllProducts();
			return res.status(200).json(productsList);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async usersList(req: AuthenticatedRequest, res: Response) {
		try {
			const isAdmin = await UsersService.isAdmin(req.user!);

			if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
			const usersList = await UsersService.getUsersList();
			return res.status(200).json(usersList);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async deleteProduct(req: AuthenticatedRequest, res: Response) {
		try {
			const isAdmin = await UsersService.isAdmin(req.user!);
			if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
			const { productId } = req.body;
			if (!productId) return res.status(400).json({ message: '"productId" property is required' });
			const deleteMessage = await ProductsService.delete(+productId);
			await FavoriteService.deleteAllFromProduct(+productId);
			deleteFolder(productId);
			return res.status(200).json(deleteMessage);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async createProduct(req: AuthenticatedRequest, res: Response) {
		try {
			const isAdmin = await UsersService.isAdmin(req.user!);
			if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
			const { name, description, price, in_stock, featured } = req.body;
			if (!name || !description || !price || !in_stock || !featured)
				return res.status(400).json({
					message:
						'Missing some of required properties: "name", "description", "price", "in_stock", "featured"!',
				});
			const newProduct = await ProductsService.create({
				name,
				description,
				price,
				num_favorites: 0,
				images: [],
				in_stock,
				featured,
			});
			//@ts-ignore
			uploadFiles(req.files, newProduct.id);
			const images = [`${process.env.URL}/product-${newProduct.id}/image1.png`];
			//@ts-ignore
			if (req.files[1]) {
				images.push(`${process.env.URL}/product-${newProduct.id}/image2.png`);
			}
			//@ts-ignore
			if (req.files[2]) {
				images.push(`${process.env.URL}/product-${newProduct.id}/image3.png`);
			}
			await newProduct.update({
				images,
			});
			return res.status(201).json(newProduct);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async updateProduct(req: AuthenticatedRequest, res: Response) {
		try {
			const isAdmin = await UsersService.isAdmin(req.user!);
			if (!isAdmin) return res.status(401).json({ message: 'Unauthorized! ' });
			const { productId, name, description, price, in_stock, featured } = req.body;
			if (!productId) return res.status(400).json({ message: '"productId" property is required' });
			//@ts-ignore
			uploadFiles(req.files, productId);
			let updatedProduct;
			if (req.files) {
				const images = [`${process.env.URL}/product-${productId}/image1.png`];
				//@ts-ignore
				if (req.files[1]) {
					images.push(`${process.env.URL}/product-${productId}/image2.png`);
				}
				//@ts-ignore
				if (req.files[2]) {
					images.push(`${process.env.URL}/product-${productId}/image3.png`);
				}
				updatedProduct = await ProductsService.update(productId, {
					name,
					description,
					price,
					images,
					in_stock,
					featured,
				});
			} else {
				updatedProduct = await ProductsService.update(productId, {
					name,
					description,
					price,
					in_stock,
					featured,
				});
			}
			return res.status(200).json(updatedProduct);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async login(req: Request, res: Response) {
		const { email, password } = req.body;
		if (!email || !password)
			return res.status(400).json({ message: 'Missing some of required properties: "email", "password"' });
		try {
			const user = await UsersService.findByEmail(email);
			if (!user) return res.status(404).json({ message: 'Senha e/ou email incorretos!' });
			const isAdmin = await UsersService.isAdmin(user);
			if (!isAdmin) return res.status(401).json({ message: 'Senha e/ou email incorretos!' });
			user.checkPassword(password, (err, isSame) => {
				if (err) return res.status(400).json({ message: err.message });
				if (!isSame) return res.status(401).json({ message: 'Senha e/ou email incorretos!' });
				const payload = {
					id: user.id,
					firstName: user.firstName,
					email: user.email,
				};
				const token = JWTService.signToken(payload, '1d');
				return res.json({
					authenticated: true,
					...payload,
					token,
				});
			});
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async getAllPurchases(req: AuthenticatedRequest, res: Response) {
		try {
			const isAdmin = await UsersService.isAdmin(req.user!);
			if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
			const purchases = await PurchaseService.getAllPurchases();
			return res.status(200).json(purchases);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
