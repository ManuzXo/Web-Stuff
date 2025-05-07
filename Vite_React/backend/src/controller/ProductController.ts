import { Request, Response } from 'express';
import BaseController from '../contract/BaseController';
import { Product } from '../db/Model/Product';

class ProductController extends BaseController {
    productModel: Product;
    constructor() {
        super('/api/products');
        this.productModel = new Product();
        console.log('ProductController initialized');
    }

    @BaseController.Post("/InsertProduct")
    public InsertProduct(req: Request, res: Response) {
        const product: Product = req.body;
        this.productModel.InsertProduct(product);
        res.send({ message: 'Product inserted successfully' });
    }


    @BaseController.Get("/GetProducts")
    public GetProducts(req: Request, res: Response) {
        res.send(this.productModel.GetProducts());
    }

    @BaseController.Delete("/DeleteProduct")
    public DeleteProduct(req: Request, res: Response) {
        const id: number = req.body.id;
        if (!id) {
            res.status(400).send({ message: 'ID is required' });
            return;
        }
        this.productModel.DeleteById(id);
        res.status(200).send({ message: 'Product deleted successfully' });
    }
}

export default ProductController;
