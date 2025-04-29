import { Request, Response } from 'express';
import BaseController from '../contract/BaseController';
import food from "../../../db/products.json";

class ProductController extends BaseController {
  constructor() {
    super('/api/products');
    console.log('ProductController initialized');
  }

  @BaseController.Get("/GetProducts")
  public getProducts(req: Request, res: Response) {
    res.send(food);
  }
}

export default ProductController;
