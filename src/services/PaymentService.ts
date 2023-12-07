import { Purchase } from '../models';
import { PurchaseCreationAttributes } from '../models/Purchase';

export default class PaymentService {
	static async createPurchase(attributtes: PurchaseCreationAttributes) {
		const newPurchase = await Purchase.create(attributtes);
		return newPurchase;
	}
}
