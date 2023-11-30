import jwt from 'jsonwebtoken';

export default class JWTService {
	static signToken(payload: string | object | Buffer, expiration: string) {
		//@ts-ignore
		return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: expiration,
		});
	}

	static verifyToken(token: string, callbackFn: jwt.VerifyCallback) {
		//@ts-ignore
		jwt.verify(token, process.env.JWT_SECRET_KEY, callbackFn);
	}
}
