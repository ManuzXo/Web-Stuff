import { Request, Response } from 'express';
import BaseController from '../contract/BaseController';

class ProductController extends BaseController {
  constructor() {
    super('products');
    console.log('ProductController initialized');
  }

  @BaseController.Get("/GetProducts")
  public getProducts(req: Request, res: Response) {
    res.send(['Product1', 'Product2', 'Product3']);
  }
}

export default ProductController;
