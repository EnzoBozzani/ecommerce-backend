import { Favorite } from '../models';

export default class FavoriteService {
	static async create(userId: number, productId: number) {
		const favorite = await Favorite.create({ productId, userId });
		return favorite;
	}
}
