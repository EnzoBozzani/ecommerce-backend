import { Request, Response } from 'express';
import ProductsService from '../services/ProductsService';
import { getPaginationParams } from '../helpers/getPaginationParams';
import { AuthenticatedRequest } from '../middlewares/auth';

export default class ProductsController {
	static async findProducts(req: Request, res: Response) {
		const { name, order, param } = req.body;

		if (!name || !order || !param)
			return res.status(400).json({ message: '"name", "order" and "param" are required' });

		if (param !== 'price' && param !== 'num_favorites')
			return res.status(400).json({ message: '"param" must be "price" or "num_favorites"' });

		if (order !== 'ASC' && order !== 'DESC')
			return res.status(400).json({ message: '"order" must be "ASC" or "DESC"' });

		const [pageNumber, perPageNumber] = getPaginationParams(req.query);
		try {
			const paginatedProducts = await ProductsService.findProducts(pageNumber, perPageNumber, param, order, name);
			return res.json(paginatedProducts);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async deleteProduct(req: AuthenticatedRequest, res: Response) {
		const user = req.user;
		if (user?.role === 'user') return res.status(401).json({ message: 'Unauthorized!' });
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
		const user = req.user;
		if (user?.role === 'user') return res.status(401).json({ message: 'Unauthorized!' });
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
