import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";


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
