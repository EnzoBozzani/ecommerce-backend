import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import FavoriteService from '../services/FavoriteService';
import ProductsService from '../services/ProductsService';

export default class FavoritesController {
	static async save(req: AuthenticatedRequest, res: Response) {
		const userId = req.user!.id;
		const { productId } = req.body;
		try {
			const favorite = await FavoriteService.create(+userId, +productId);
			const product = await ProductsService.findById(+productId);
			if (!product) return res.status(400).json({ message: 'Product does not exist!' });
			product.num_favorites!++;
			product?.save();
			return res.status(201).json(favorite);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async isProductFavorited(req: AuthenticatedRequest, res: Response) {
		const userId = req.user!.id;
		const { id } = req.query;
		if (!id) return res.status(400).json({ message: 'productId is required' });
		try {
			const favorite = await FavoriteService.isFavorited(+userId, +id);
			if (favorite) return res.status(200).json({ favorited: true });
			return res.status(200).json({ favorited: false });
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async getFavoritedProducts(req: AuthenticatedRequest, res: Response) {
		const userId = req.user!.id;
		try {
			const products = await FavoriteService.findProductsLikedByUser(+userId);
			return res.status(200).json({ userId, products });
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async delete(req: AuthenticatedRequest, res: Response) {
		const userId = req.user!.id;
		const { productId } = req.body;
		if (!productId) return res.status(400).json({ message: '"productId" property is required' });
		try {
			const product = await ProductsService.findById(+productId);
			if (!product) return res.status(400).json({ message: 'Product does not exist!' });
			const isFavorited = await FavoriteService.isFavorited(userId, productId);
			if (!isFavorited) return res.status(400).json({ message: 'Product not favorited by this user!' });
			await FavoriteService.delete(+userId, +productId);
			product.num_favorites!--;
			product?.save();
			return res.status(200).json({ message: 'Deleted with success!' });
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
