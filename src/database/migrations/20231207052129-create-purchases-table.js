'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('purchases', {
			user_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			product_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
				references: { model: 'products', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			status: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				defaultValue: 'shipped',
			},
			amount: {
				allowNull: false,
				type: Sequelize.DataTypes.FLOAT,
			},
			address_complement: {
				allowNull: true,
				type: Sequelize.DataTypes.STRING,
			},
			address_number: {
				allowNull: false,
				type: Sequelize.DataTypes.INTEGER,
			},
			address_street: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			address_city: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			address_state: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			address_country: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			address_postal_code: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
