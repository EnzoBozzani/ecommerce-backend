import { ResourceOptions } from "adminjs";

export const productResourceOptions: ResourceOptions = {
    navigation: 'Produtos',
    editProperties: ['name', 'description', 'price', 'image1Url', 'image2Url', 'image3Url'],
    filterProperties: ['name', 'price', 'createdAt', 'updatedAt'],
    listProperties: ['id', 'name', 'price']
}