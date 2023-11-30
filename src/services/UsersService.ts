import { User } from '../models';
import { UserCreationAttributes } from '../models/User';

export default class UsersService {
	static async findByEmail(email: string) {
		const user = await User.findOne({ where: { email } });
		return user;
	}

	static async createUser(userData: UserCreationAttributes) {
		const user = await User.create(userData);
		return user;
	}
}
