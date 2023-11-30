import { NextFunction, Request, Response } from 'express';
import JWTService from '../services/JWTService';
import UsersService from '../services/UsersService';
import { JwtPayload } from 'jsonwebtoken';
import { UserInstance } from '../models/User';

export interface AuthenticatedRequest extends Request {
	user?: UserInstance | null;
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader) return res.status(401).json({ message: 'Não autorizado. Nenhum token foi encontrado.' });

	const token = authorizationHeader.replace(/Bearer /, '');

	JWTService.verifyToken(token, (err, decoded) => {
		if (err || typeof decoded === 'undefined')
			return res.status(401).json({ message: 'Não autorizado. Token inválido.' });

		UsersService.findByEmail((decoded as JwtPayload).email).then((user) => {
			req.user = user;
			next();
		});
	});
}
