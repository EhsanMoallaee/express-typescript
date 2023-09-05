import { Request, Response } from "express";
import config from 'config';
import { validateUserPasswordService } from "../service/user.service";
import { createSessionService, getUserSessionsService, updateUserSessionService } from "../service/session.service";
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

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const sessions = await getUserSessionsService({userId, valid: true});
    return res.status(200).send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;
    await updateUserSessionService({_id: sessionId}, {valid: false});
    return res.send({
        accessToken: null,
        refreshToken: null
    })
}
