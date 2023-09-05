import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'jwtRS256.key'), 'utf8')
const publicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'jwtRS256.key.pub'), 'utf8');

export function signJwt(payload: object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey, {algorithms: ['RS256']});
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}