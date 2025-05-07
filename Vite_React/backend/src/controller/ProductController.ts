import { Request, Response } from 'express';
import BaseController from '../contract/BaseController';
import { Product } from '../db/Model/Product';

class ProductController extends BaseController {
    foodModel: Product;
    constructor() {
        super('/api/products');
        this.foodModel = new Product();
        console.log('ProductController initialized');
    }

    @BaseController.Post("/InsertProduct")
    public InsertProduct(req: Request, res: Response) {
        const food: Product = req.body;
        this.foodModel.InsertProduct(food);
        res.send({ message: 'Product inserted successfully' });
    }


    @BaseController.Get("/GetProducts")
    public GetProducts(req: Request, res: Response) {
        res.send(this.foodModel.GetProducts());
    }

    @BaseController.Delete("/DeleteProduct")
    public DeleteProduct(req: Request, res: Response) {
        const id: number = req.body.id;
        if (!id) {
            res.status(400).send({ message: 'ID is required' });
            return;
        }
        this.foodModel.DeleteById(id);
        res.status(200).send({ message: 'Product deleted successfully' });
    }
}

export default ProductController;
