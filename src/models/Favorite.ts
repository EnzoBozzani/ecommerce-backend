import { DataTypes, Model } from 'sequelize';
import { ProductInstance } from './Product';
import { UserInstance } from './User';
import { sequelize } from '../database';

export interface Favorite {
	userId: number;
	productId: number;
}

export interface FavoriteInstance extends Model<Favorite>, Favorite {
	product?: ProductInstance;
	user?: UserInstance;
}

export const Favorite = sequelize.define<FavoriteInstance>('Favorite', {
	userId: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.INTEGER,
		references: { model: 'users', key: 'id' },
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
	productId: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.INTEGER,
		references: { model: 'products', key: 'id' },
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
});
