import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import FavoriteService from '../services/FavoriteService';

export default class FavoritesController {
	static async save(req: AuthenticatedRequest, res: Response) {
		const userId = req.user!.id;
		const { courseId } = req.body;
		try {
			const favorite = await FavoriteService.create(userId, Number(courseId));
			return res.status(201).json(favorite);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
