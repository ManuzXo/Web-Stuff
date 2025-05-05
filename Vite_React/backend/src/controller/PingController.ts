import { Request, Response } from 'express';
import BaseController from "../contract/BaseController";

class PingController extends BaseController {
    constructor() {
        super('/api/ping');
        console.log('PingController initialized');
    }
    @BaseController.Get("")
    public Ping(req: Request, res: Response) {
        res.status(200).send("pong");
    }
}
export default PingController;