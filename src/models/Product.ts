import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../database';

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	images: string[];
	num_favorites?: number;
	in_stock: number;
	featured?: boolean;
}

export interface ProductCreationAttributes extends Optional<Product, 'id'> {}

export interface ProductInstance extends Model<Product, ProductCreationAttributes>, Product {}

export const Product = sequelize.define<ProductInstance, Product>('Product', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	description: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	price: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},
	images: {
		allowNull: false,
		type: DataTypes.ARRAY(DataTypes.STRING),
	},
	num_favorites: {
		allowNull: false,
		defaultValue: 0,
		type: DataTypes.INTEGER,
	},
	in_stock: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	featured: {
		defaultValue: false,
		type: DataTypes.BOOLEAN,
	},
});
