import { Product } from '../models';
import { Op } from 'sequelize';

export default class ProductsService {
	static async findProducts(
		page: number,
		perPage: number,
		param: 'price' | 'num_favorites',
		order: 'ASC' | 'DESC',
		name: string
	) {
		const offset = (page - 1) * perPage;

		const { count, rows } = await Product.findAndCountAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
			order: [[param, order]],
			limit: perPage,
			offset,
		});
		return {
			products: rows,
			page,
			perPage,
			total: count,
		};
	}

	static async findById(productId: number) {
		const product = await Product.findByPk(productId);
		return product;
	}
}
