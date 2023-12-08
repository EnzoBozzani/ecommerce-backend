import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import Stripe from 'stripe';
import ProductsService from '../services/ProductsService';
import PurchaseService from '../services/PurchaseService';

const stripe = new Stripe(process.env.STRIPE_KEY || '');

export default class PaymentController {
	static async buyProduct(req: AuthenticatedRequest, res: Response) {
		const {
			productId,
			stripeToken,
			addressCity,
			addressComplement,
			addressCountry,
			addressNumber,
			addressState,
			addressStreet,
			addressPostalCode,
		} = req.body;
		if (
			!productId ||
			!stripeToken ||
			!addressCity ||
			!addressCountry ||
			!addressNumber ||
			!addressState ||
			!addressStreet ||
			!addressPostalCode
		)
			return res.status(200).json({
				message:
					'Missing some of required properties: "productId", "stripeToken", "addressCity", "addressCountry", "adressNumber", "addressState", "addressStreet", "addressPostalCode"',
			});
		const userId = req.user!.id;
		const product = await ProductsService.findById(+productId);
		if (!product) return res.status(404).json({ message: 'Product not available!' });
		const amount = product!.price * 100;
		try {
			await stripe.charges.create({
				amount,
				currency: 'brl',
				source: stripeToken,
				description: `Payment of R$${product?.price} for product: ${amount}`,
			});

			const purchase = await PurchaseService.createPurchase({
				userId,
				productId,
				addressCity,
				addressComplement,
				addressCountry,
				addressNumber,
				addressPostalCode,
				addressState,
				addressStreet,
				amount,
				status: 'shipped',
			});

			product!.in_stock--;
			product?.save();

			return res.status(200).json(purchase);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
