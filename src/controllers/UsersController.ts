import { AuthenticatedRequest } from '../middlewares/auth';
import PurchaseService from '../services/PurchaseService';
import UsersService from '../services/UsersService';
import { Response } from 'express';

export default class UsersController {
	static async update(req: AuthenticatedRequest, res: Response) {
		const { firstName, lastName, phone, birth, email } = req.body;
		const userId = req.user!.id;
		try {
			const updatedUser = await UsersService.updateData(userId, { firstName, lastName, phone, birth, email });
			return res.status(200).json(updatedUser);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async updatePassword(req: AuthenticatedRequest, res: Response) {
		{
			const user = req.user!;
			const { currentPassword, newPassword } = req.body;
			user.checkPassword(currentPassword, async (err, isSame) => {
				try {
					if (err) return res.status(400).json({ message: err.message });
					if (!isSame) return res.status(400).json({ message: 'Senha errada!' });
					await UsersService.updatePassword(user.id, newPassword);
					return res.status(204).send();
				} catch (err) {
					if (err instanceof Error) {
						return res.status(400).json({ message: err.message });
					}
				}
			});
		}
	}

	static async userData(req: AuthenticatedRequest, res: Response) {
		const user = req.user!;
		try {
			const userData = await UsersService.findByEmail(user?.email);
			return res.status(200).json(userData);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async getAllPurchases(req: AuthenticatedRequest, res: Response) {
		const userId = req.user!.id;
		try {
			const purchases = await PurchaseService.getUserPurchases(userId);
			return res.status(200).json({ purchases });
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
