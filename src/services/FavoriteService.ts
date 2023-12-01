import { Favorite } from '../models';

export default class FavoriteService {
	static async create(userId: number, productId: number) {
		const favorite = await Favorite.create({ productId, userId });
		return favorite;
	}

	static async findProductsLikedByUser(userId: number) {
		const favorites = await Favorite.findAll({
			where: { userId },
			attributes: [['user_id', 'userId']],
			include: {
				association: 'Product',
				attributes: [
					'id',
					'name',
					'description',
					'price',
					['image1_url', 'image1Url'],
					['image1_url', 'image1Url'],
					['image1_url', 'image1Url'],
				],
			},
		});
		const products = favorites.map((favorite) => favorite.Product);
		return products;
	}

	static async delete(userId: number, productId: number) {
		const deletedFav = await Favorite.destroy({
			where: { userId, productId },
		});
		return deletedFav;
	}

	static async isFavorited(userId: number, productId: number) {
		const isFavorited = await Favorite.findOne({ where: { userId, productId } });
		return isFavorited;
	}
}