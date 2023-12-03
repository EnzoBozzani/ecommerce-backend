import { AuthenticatedRequest } from '../middlewares/auth';
import UsersService from '../services/UsersService';
import { Request, Response } from 'express';
import ProductsService from '../services/ProductsService';
import { getPaginationParams } from '../helpers/getPaginationParams';
import JWTService from '../services/JWTService';

export default class AdminController {
	static async usersList(req: AuthenticatedRequest, res: Response) {
		const [pageNumber, perPageNumber] = getPaginationParams(req.query);
		const isAdmin = await UsersService.isAdmin(req.user!);

		if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
		try {
			const usersList = await UsersService.getUsersList(pageNumber, perPageNumber);
			return res.status(200).json(usersList);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async deleteProduct(req: AuthenticatedRequest, res: Response) {
		const isAdmin = await UsersService.isAdmin(req.user!);
		if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
		const { productId } = req.body;
		try {
			const deleteMessage = await ProductsService.delete(+productId);
			return res.status(200).json(deleteMessage);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async createProduct(req: AuthenticatedRequest, res: Response) {
		const isAdmin = await UsersService.isAdmin(req.user!);
		if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
		const { name, description, price, image1_url, image2_url, image3_url, num_favorites, in_stock } = req.body;
		try {
			const newProduct = await ProductsService.create({
				name,
				description,
				price,
				image1_url,
				image2_url,
				image3_url,
				num_favorites,
				in_stock,
			});
			return res.status(201).json(newProduct);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}

	static async login(req: Request, res: Response) {
		const { email, password } = req.body;
		try {
			const user = await UsersService.findByEmail(email);
			if (!user) return res.status(404).json({ message: 'Email not registered!' });
			const isAdmin = await UsersService.isAdmin(user);
			if (!isAdmin) return res.status(401).json({ message: 'Unauthorized!' });
			user.checkPassword(password, (err, isSame) => {
				if (err) return res.status(400).json({ message: err.message });
				if (!isSame) return res.status(401).json({ message: 'Incorrect password!' });
				const payload = {
					id: user.id,
					firstName: user.firstName,
					email: user.email,
				};
				const token = JWTService.signToken(payload, '1d');
				return res.json({
					authenticated: true,
					...payload,
					token,
				});
			});
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
