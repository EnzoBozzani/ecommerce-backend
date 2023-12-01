import { User } from '../models';
import { UserCreationAttributes } from '../models/User';

type UserDataUpdate = {
	firstName?: string;
	lastName?: string;
	phone?: string;
	birth?: Date;
	email?: string;
};

export default class UsersService {
	static async findByEmail(email: string) {
		const user = await User.findOne({ where: { email } });
		return user;
	}

	static async createUser(userData: UserCreationAttributes) {
		const user = await User.create(userData);
		return user;
	}

	static async updateData(userId: number, attributes: UserDataUpdate) {
		const user = await User.findByPk(userId);
		await user?.update(attributes);
		return user;
	}
}
