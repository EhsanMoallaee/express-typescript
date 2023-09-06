import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializeUser = async (req:Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, 'headers.authorization', '').replace(
        /^Bearer\s/,
        ""
      );
    if(!accessToken) return next();
    const refreshToken = req.header('x-refresh') || '';
    const {decoded, expired} = verifyJwt(accessToken);
    if(decoded) {
        res.locals.user = decoded;
        return next();
    }
    if(expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({refreshToken});
        if(newAccessToken) {
            res.setHeader('x-access-token', newAccessToken)
            const result = verifyJwt(newAccessToken);
            res.locals.user = result.decoded;
            return next();
        }
    }
    return next();
}
export default deserializeUser;


// postman.setEnvironmentVariable("accessToken", jsonData.accessToken);
// postman.setEnvironmentVariable("refreshToken", jsonData.refreshToken);