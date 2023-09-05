import UserModel, { UserDocument } from '../models/user.model';
import { omit } from "lodash";

export async function createUserService(input:  Pick<UserDocument, 'email' | 'name' | 'password'>) {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), ['password', '__v']);
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function validateUserPasswordService({email, password}: {email: string, password: string}) {
    const user = await UserModel.findOne({ email });
    if(!user) return false;
    const isValidPassword = await user.comparePassword(password);
    if(!isValidPassword) return false;
    return omit(user.toJSON(), ['password', '__v']);
}
