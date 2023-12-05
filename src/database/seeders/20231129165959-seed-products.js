'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'products',
			[
				{
					name: 'Iphone 8',
					description: 'Lorem iftujrfmifmrir rinfunrf',
					price: 1500,
					images: [''],
					in_stock: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'Iphone 8',
					description: 'Lorem iftujrfmifmrir rinfunrf',
					price: 1500,
					images: [''],
					in_stock: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'Iphone X',
					description: 'Lorem iftujrfmifmrir rinfunrf',
					price: 2200,
					images: [''],
					in_stock: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'Iphone 11',
					description: 'Lorem iftujrfmifmrir rinfunrf',
					price: 2900,
					images: [''],
					in_stock: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'MacBook Pro',
					description: 'Lorem iftujrfmifmrir rinfunrf',
					price: 9000,
					images: [''],
					in_stock: 4,
					featured: true,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('products', null, {});
	},
};
