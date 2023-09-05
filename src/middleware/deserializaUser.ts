import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';

const deserializeUser = (req:Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, 'headers.authorization', '').split(' ')[1];
    if(!accessToken) return next();

    const {decoded, expired} = verifyJwt(accessToken);
    if(decoded) {
        res.locals.user = decoded;
        return next();
    }
    return next();
}
export default deserializeUser;
