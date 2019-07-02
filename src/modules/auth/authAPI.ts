import express from 'express';
import httpStatus from 'http-status';

import { User } from './../users/models';
import { HTTP400Error } from '../../utils';
import { AuthService } from './authService';

const router = express.Router();

router.post('/loginOrRegister', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            // user already registered, checking password
            const isPasswordCorrect = await AuthService.verifyPassword(password, user.password);
            if (isPasswordCorrect) {
                const payload = {
                    id: user._id,
                    username: user.username,
                };

                const tokenStr = await AuthService.generateJWTToken(payload);
                res.status(httpStatus.OK).json(tokenStr);
            } else {
                throw new HTTP400Error('passowrd provided is incorrect!');
            }
        } else {
            // user needs to be registered
            const newUser = new User({
                username,
            });

            const passwordHash = await AuthService.hashPassword(password);
            newUser.password = passwordHash;
            await newUser.save();

            const payload = {
                id: newUser._id,
                username: newUser.username,
            };
            const tokenStr = await AuthService.generateJWTToken(payload);
            res.status(httpStatus.CREATED).json(tokenStr);
        }
    } catch (err) {
        throw new HTTP400Error(`bad parameters caused an error, user wasn't registered/logged in!`);
    }
});

// router.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
//     res.status(httpStatus.OK).send('REACHED');
// });

export { router };
