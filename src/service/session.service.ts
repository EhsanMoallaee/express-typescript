import { FilterQuery, UpdateQuery } from "mongoose";
import config from 'config';
import { get } from 'lodash';
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUserService } from "./user.service";


export async function createSessionService(userId: string, userAgent: string) {
    const session = await SessionModel.create({ userId, userAgent});
    return session.toJSON();
}

export async function getUserSessionsService(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateUserSessionService(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return await SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({refreshToken} : { refreshToken: string }) {
    const { decoded } = verifyJwt(refreshToken);
    if(!decoded || !get(decoded, 'session')) return false;

    const session = await SessionModel.findById(get(decoded, 'session'));
    if(!session || !session.valid) return false;

    const user = await findUserService({_id: session.userId});
    if(!user) return false;

    const accessToken = signJwt(
        { ...user, session: session._id },
        {expiresIn: config.get('accessTokenTtl')}
    )
    return accessToken;
}
