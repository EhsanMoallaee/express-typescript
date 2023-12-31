import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends mongoose.Document {
    userId: UserDocument['_id'];
    valid: boolean;
    createdAt: Date;
    updatedAt: Date;
    userAgent: string;
}

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true},
    userAgent: { type: String }
}, { timestamps: true })

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;