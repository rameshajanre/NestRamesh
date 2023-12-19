import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class BookMiddleWares implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
       console.log("user base middlewares");
       next()
    }
    
}