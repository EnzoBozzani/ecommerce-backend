'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			description: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			price: {
				allowNull: false,
				type: Sequelize.DataTypes.FLOAT,
			},
			images: {
				allowNull: false,
				type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
			},
			num_favorites: {
				allowNull: false,
				defaultValue: 0,
				type: Sequelize.DataTypes.INTEGER,
			},
			in_stock: {
				allowNull: false,
				type: Sequelize.DataTypes.INTEGER,
			},
			featured: {
				defaultValue: false,
				type: Sequelize.DataTypes.BOOLEAN,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('products');
	},
};
