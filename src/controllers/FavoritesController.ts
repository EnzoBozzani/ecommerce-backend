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
			product!.num_favorites++;
			product?.save();
			return res.status(201).json(favorite);
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
		try {
			const isFavorited = await FavoriteService.isFavorited(userId, productId);
			if (isFavorited)
				return res
					.status(400)
					.json({ message: 'Erro! Produto não está salvo como favorito por este usuário!' });
			await FavoriteService.delete(+userId, +productId);
			const product = await ProductsService.findById(+productId);
			product!.num_favorites--;
			product?.save();
			return res.status(200).json({ message: 'Deletado com sucesso!' });
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
