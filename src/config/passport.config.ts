import dotenv from 'dotenv';
import { PassportStatic } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { User, IUser } from './../modules/users/models';

dotenv.config();
const secret = process.env.JWT_SECERT || 'some other secret as default';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
};

export default (passport: PassportStatic) => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            User.findById(payload.id).then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        username: user.username,
                    });
                }
                return done(null, false);
            });
        }),
    );
};
