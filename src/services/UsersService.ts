import { User } from '../models';
import { UserCreationAttributes, UserInstance } from '../models/User';

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

	static async updatePassword(id: number, password: string) {
		const [numberOfAffectedRows, updatedUser] = await User.update(
			{ password },
			{
				where: { id },
				returning: true,
				individualHooks: true,
			}
		);

		return updatedUser[0];
	}

	static async getUsersList() {
		const { count, rows } = await User.findAndCountAll({
			order: [
				['first_name', 'ASC'],
				['last_name', 'ASC'],
			],
			where: { role: 'user' },
			attributes: ['id', 'firstName', 'lastName', 'phone', 'email'],
		});
		return {
			users: rows,
			total: count,
		};
	}

	static async isAdmin(user: UserInstance) {
		const u = await User.findOne({
			where: {
				firstName: user.firstName,
				id: user.id,
				email: user.email,
			},
			attributes: ['role'],
		});
		return u?.role === 'admin';
	}
}
