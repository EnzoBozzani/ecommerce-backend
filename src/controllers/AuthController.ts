import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

export default class AuthController {
	static async register(req: Request, res: Response) {
		const { firstName, lastName, email, password, birth, phone } = req.body;
		try {
			const userAlreadyExists = await UsersService.findByEmail(email);
			if (userAlreadyExists) throw new Error('Este email já está cadastrado');
			const newUser = await UsersService.createUser({
				firstName,
				lastName,
				email,
				password,
				birth,
				phone,
				role: 'user',
			});
			return res.status(201).json(newUser);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).json({ message: err.message });
			}
		}
	}
}
