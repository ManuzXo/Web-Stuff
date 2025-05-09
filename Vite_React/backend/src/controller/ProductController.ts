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

    @BaseController.Get("/Test")
    public Test(req: Request, res: Response) {
        setTimeout(() => {
            res.send(this.productModel.GetProducts());
        }, 3000);
    }

    @BaseController.Get("/GetProducts")
    public GetProducts(req: Request, res: Response) {
        res.send(this.productModel.GetProducts());
    }


    @BaseController.Post("/InsertProduct")
    public InsertProduct(req: Request, res: Response) {
        const product: Product = req.body;
        this.productModel.InsertProduct(product);
        res.send({ message: 'Product inserted successfully' });
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
