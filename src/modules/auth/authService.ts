import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import { UsersRepo } from './../users';
import { HTTP400Error } from './../../utils';
import { IUser } from 'modules/users/models';

import { LoginOrRegisterResponse } from './interfaces';

const secret = process.env.JWT_SECERT || 'the default secret';
export class AuthService {
    static async loginOrRegister(username: string, password: string): Promise<LoginOrRegisterResponse> {
        const usersRepo = new UsersRepo();
        const user = await usersRepo.findOne({ username });

        if (user) {
            // user already registered, checking password
            const isPasswordCorrect = await AuthService.verifyPassword(password, user.password);
            if (isPasswordCorrect) {
                const payload = {
                    id: user._id,
                    username: user.username,
                };

                const tokenStr = await AuthService.generateJWTToken(payload);
                return {
                    created: false,
                    token: tokenStr,
                    user,
                };
            } else {
                throw new HTTP400Error('passowrd provided is incorrect!');
            }
        } else {
            // user needs to be registered
            const newUser = { username, password: '' };

            const passwordHash = await AuthService.hashPassword(password);
            newUser.password = passwordHash;

            const userRec = await usersRepo.create(newUser as IUser);

            const payload = {
                id: userRec._id,
                username: userRec.username,
            };

            const tokenStr = await AuthService.generateJWTToken(payload);
            return {
                created: true,
                token: tokenStr,
                user: userRec,
            };
        }
    }

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
