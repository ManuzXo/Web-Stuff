import { Request, Response } from 'express';
import BaseController from '../contract/BaseController';
import foods from "../../../db/products.json";
import { Food } from '../db/Model/Food';

class ProductController extends BaseController {
    foodModel: Food;
    constructor() {
        super('/api/products');
        this.foodModel = new Food();
        console.log('ProductController initialized');
    }

    @BaseController.Get("/Init")
    public Init(req: Request, res: Response) {
        for (let food of foods) {
            this.foodModel.InsertFood(food as Food)
        }
        res.send({ message: 'Products initialized successfully' });
    }

    @BaseController.Post("/InsertProduct")
    public InsertProduct(req: Request, res: Response) {
        const food: Food = req.body;
        this.foodModel.InsertFood(food);
        res.send({ message: 'Product inserted successfully' });
    }


    @BaseController.Get("/GetProducts")
    public GetProducts(req: Request, res: Response) {
        res.send(this.foodModel.GetFoods());
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
