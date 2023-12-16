import { Purchase } from '../models';
import { PurchaseCreationAttributes } from '../models/Purchase';

export default class PurchaseService {
	static async createPurchase(attributtes: PurchaseCreationAttributes) {
		const newPurchase = await Purchase.create(attributtes);
		return newPurchase;
	}

	static async getUserPurchases(userId: number) {
		const purchases = await Purchase.findAll({
			where: { userId },
			include: {
				association: 'Product',
			},
		});
		return purchases;
	}

	static async getAllPurchases() {
		const { rows, count } = await Purchase.findAndCountAll({
			attributes: ['id', 'userId', 'productId', 'status', 'amount'],
			include: [
				{
					association: 'Product',
					attributes: ['name'],
				},
				{
					association: 'User',
					attributes: ['email'],
				},
			],
		});
		return {
			purchases: rows,
			total: count,
		};
	}
}
