import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import JWTService from '../services/JWTService';

export default class AuthController {
	static async register(req: Request, res: Response) {
		const { firstName, lastName, email, password, birth, phone } = req.body;
		if (!firstName || !lastName || !email || !password || !birth || !phone)
			return res.status(400).json({
				message:
					'Missing some of required properties: "firstName", "lastName", "email", "password", "birth", "phone"',
			});
		try {
			const userAlreadyExists = await UsersService.findByEmail(email);
			if (userAlreadyExists) throw new Error('Email already registered!');
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

	static async login(req: Request, res: Response) {
		const { email, password } = req.body;
		if (!email || !password)
			return res.status(400).json({ message: 'Missing some of required properties: "email", "password"' });
		try {
			const user = await UsersService.findByEmail(email);
			if (!user) return res.status(404).json({ message: 'Email not registered!' });
			user.checkPassword(password, (err, isSame) => {
				if (err) return res.status(400).json({ message: err.message });
				if (!isSame) return res.status(401).json({ message: 'Incorrect password!' });
				const payload = {
					id: user.id,
					firstName: user.firstName,
					email: user.email,
				};
				const token = JWTService.signToken(payload, '7d');
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
