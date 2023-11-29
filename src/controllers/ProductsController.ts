import { Product } from "../models";
import { Request, Response } from 'express';

export default class ProductsController {
    static async findOrderedByPriceASC(req: Request, res: Response) {
        try {
            const products = await Product.findAll({
                order: [['price', 'ASC']]
            });
            return res.json(products);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}