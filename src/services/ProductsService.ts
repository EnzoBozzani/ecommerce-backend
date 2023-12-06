import { Product } from '../models';
import { Op } from 'sequelize';
import { ProductCreationAttributes } from '../models/Product';

interface ProductUpdateAttributes {
	name?: string;
	description?: string;
	price?: number;
	images?: string[];
	in_stock?: number;
	featured?: boolean;
}

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

	static async findFeaturedProducts(page: number, perPage: number) {
		const offset = (page - 1) * perPage;
		const { count, rows } = await Product.findAndCountAll({
			where: {
				featured: true,
			},
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

	static async delete(productId: number) {
		const product = await Product.findByPk(productId);
		if (!product) return { message: "Product doesn't exist!" };
		await product.destroy();
		return { message: 'Successfully deleted!' };
	}

	static async create(attributes: ProductCreationAttributes) {
		const product = await Product.create(attributes);
		return product;
	}

	static async update(productId: number, attributes: ProductUpdateAttributes) {
		const product = await Product.findByPk(productId);
		await product?.update(attributes);
		return product;
	}
}
