import jwt from 'jsonwebtoken';
import { errorResponse } from './response-object';
import dotenv from 'dotenv';


dotenv.config();

const signature: any = process.env.JWTSIGN;

export const authMiddleware = (req: any, res: any, next: any) => {
    const { token } = req.headers;
    if (token) {
        jwt.verify(token, signature, function (err: any, decoded: any) {
            if (err) {
                errorResponse(res, err);
            } else {
                if (decoded?.userId) {
                    next();
                } else {
                    errorResponse(res, {}, 'invalid token, somthing went wrong with token decoded')
                }
            }
        })
    } else {
        errorResponse(res, {}, 'token not presents in headers')
    }
}