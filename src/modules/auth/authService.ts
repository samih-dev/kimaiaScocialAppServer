import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();
const secret = process.env.JWT_SECERT || 'the default secret';
export class AuthService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async generateJWTToken(payload: any) {
        const token = await jwt.sign(payload, secret, { expiresIn: 36000 });
        return `bearer ${token}`;
    }

    static async hashPassword(password: string) {
        // general and assign a hashed passowrd
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    }

    static async verifyPassword(password: string, hashedPassowrd: string) {
        return await bcrypt.compare(password, hashedPassowrd);
    }
}
