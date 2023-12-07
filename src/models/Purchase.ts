import { Model, DataTypes } from 'sequelize';
import { ProductInstance } from './Product';
import { UserInstance } from './User';
import { sequelize } from '../database';

export interface Purchase {
	userId: number;
	productId: number;
	status: 'shipped' | 'delivered';
	amount: number;
	addressComplement?: string;
	addressNumber: number;
	addressStreet: string;
	addressCity: string;
	addressState: string;
	addressCountry: string;
	addressPostalCode: string;
}

export interface PurchaseInstance extends Model<Purchase>, Purchase {
	Product?: ProductInstance;
	user?: UserInstance;
}

export const Purchase = sequelize.define<PurchaseInstance>('Purchase', {
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
	status: {
		allowNull: false,
		type: DataTypes.STRING,
		defaultValue: 'shipped',
	},
	amount: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},
	addressComplement: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	addressNumber: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	addressStreet: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	addressCity: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	addressState: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	addressCountry: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	addressPostalCode: {
		allowNull: false,
		type: DataTypes.STRING,
	},
});
