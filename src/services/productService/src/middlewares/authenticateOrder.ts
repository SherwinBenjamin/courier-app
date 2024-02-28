import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';

const authenticateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const authorizationHeader = req.header('Authorization');
        if(!authorizationHeader){
            throw new Error('Authorization header is missing');
        }
        const token = authorizationHeader?.replace('Bearer ', '');
        if(!token){
            throw new Error('Token is missing');
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {userId: string};
        if(!decoded){
            throw new Error('Token is invalid');
        }
        req.body.user = decoded;
        console.log('auth middleware', decoded);
        next();
    }catch(error:any){
        res.status(401).json({message: error.message});
    }

}

export default authenticateOrder;

