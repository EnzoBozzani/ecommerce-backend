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
			image1_url: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			image2_url: {
				allowNull: true,
				type: Sequelize.DataTypes.STRING,
			},
			image3_url: {
				allowNull: true,
				type: Sequelize.DataTypes.STRING,
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
