import { Request, Response } from "express";
import config from 'config';
import { validateUserPasswordService } from "../service/user.service";
import { createSessionService } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";


export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validateUserPasswordService(req.body);
    if(!user) return res.status(401).send('Invalid email or password');

    const session = await createSessionService(user._id, req.get('user-agent') || '');

    const accessToken = signJwt(
        { ...user, session: session._id },
        {expiresIn: config.get('accessTokenTtl')}
    )
    const refreshToken = signJwt(
        { ...user, session: session._id },
        {expiresIn: config.get('refreshTokenTtl')}
    )

    return res.status(200).send({accessToken, refreshToken});
}