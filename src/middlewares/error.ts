import { type Request, type Response,type NextFunction } from "express";
import {CustomError} from "../lib/customError.js" 

export function errorMiddleware(err: CustomError, req: Request, res: Response, next: NextFunction) {
    if(err) return res.status(err.status).json({error: err.name, message: err.message})

        next()
    
}