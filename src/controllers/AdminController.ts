import { AuthenticatedRequest } from '../middlewares/auth';
import UsersService from '../services/UsersService';
import { Response } from 'express';
import ProductsService from '../services/ProductsService';

export default class AdminController {
	static async usersList(req: AuthenticatedRequest, res: Response) {
		const isAdmin = await UsersService.isAdmin(req.user!);
		if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
		try {
			//eioueojm
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async deleteProduct(req: AuthenticatedRequest, res: Response) {
		const isAdmin = await UsersService.isAdmin(req.user!);
		if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
		const { productId } = req.body;
		try {
			const deleteMessage = await ProductsService.delete(+productId);
			return res.status(200).json(deleteMessage);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async createProduct(req: AuthenticatedRequest, res: Response) {
		const isAdmin = await UsersService.isAdmin(req.user!);
		if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
		const { name, description, price, image1_url, image2_url, image3_url, num_favorites, in_stock } = req.body;
		try {
			const newProduct = await ProductsService.create({
				name,
				description,
				price,
				image1_url,
				image2_url,
				image3_url,
				num_favorites,
				in_stock,
			});
			return res.status(201).json(newProduct);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
