import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import Stripe from 'stripe';
import ProductsService from '../services/ProductsService';

const stripe = new Stripe(process.env.STRIPE_KEY || '');

export default class PaymentController {
	static async buyProduct(req: AuthenticatedRequest, res: Response) {
		const { productId, stripeToken, address } = req.body;
		const userId = req.user!.id;
		const product = await ProductsService.findById(+productId);
		const amount = product!.price * 100;
		try {
			const payment = await stripe.charges.create({
				amount,
				currency: 'brl',
				source: stripeToken,
				description: `Payment of R$${product?.price} for product: ${amount}`,
			});

			/*const purchase = await PaymentService.create({
                userId, 
                productId, 
                status: 'shipped', 
                amount, 
                address, 
            }) */

			product!.in_stock--;
			product?.save();

			return res.status(200).json(payment);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
