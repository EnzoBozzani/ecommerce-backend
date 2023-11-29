'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('favorites', {
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
		await queryInterface.dropTable('favorites');
	},
};
