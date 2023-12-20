import { Request, Response } from 'express';
import ProductsService from '../services/ProductsService';
import { getPaginationParams } from '../helpers/getPaginationParams';

export default class ProductsController {
	static async findProducts(req: Request, res: Response) {
		const { name, order, param } = req.query;

		if (!order || !param)
			return res.status(400).json({ message: 'Missing some of required properties: "order", "param"' });

		if (param !== 'price' && param !== 'num_favorites')
			return res.status(400).json({ message: '"param" must be "price" or "num_favorites"' });

		if (order !== 'ASC' && order !== 'DESC')
			return res.status(400).json({ message: '"order" must be "ASC" or "DESC"' });

		const [pageNumber, perPageNumber] = getPaginationParams(req.query);
		try {
			const paginatedProducts = await ProductsService.findProducts(
				pageNumber,
				perPageNumber,
				param,
				order,
				(name as string) || ''
			);
			return res.status(200).json(paginatedProducts);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async getFeaturedProducts(req: Request, res: Response) {
		const [pageNumber, perPageNumber] = getPaginationParams(req.query);
		try {
			const paginatedFeaturedProducts = await ProductsService.findFeaturedProducts(pageNumber, perPageNumber);
			return res.status(200).json(paginatedFeaturedProducts);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async getProductByID(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const product = await ProductsService.findById(+id);
			if (!product) return res.status(404).json({ message: 'Produto não disponível!' });
			return res.status(200).json(product);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
