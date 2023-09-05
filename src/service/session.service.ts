import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";


export async function createSessionService(userId: string, userAgent: string) {
    const session = await SessionModel.create({ userId, userAgent});
    return session.toJSON();
}

export async function getUserSessionsService(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}
