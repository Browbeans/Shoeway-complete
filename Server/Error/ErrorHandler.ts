import { NextFunction, Request, Response } from "express";

const ApiError = require('./ApiError');
export type ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => any;

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    if(err instanceof ApiError){
        res.status(err.code).json(err.message);
        return; 
    }

    res.status(500).json('something went wrong');
}

export default errorHandler;