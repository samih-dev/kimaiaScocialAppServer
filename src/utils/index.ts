export * from './httpErrors';

import { Application, Router } from 'express-serve-static-core';
import { EModuleName } from '../modules';
import passport from 'passport';

type Wrapper = (app: Application) => void;

export const applyMiddleware = (middleware: Wrapper[], app: Application) => {
    for (const f of middleware) {
        f(app);
    }
};

const passportStrategy = 'jwt';
const passportOptions = { session: false };
export const applyRoutes = (routers: Map<string, Router>, app: Application) => {
    const apiBase = '/api/v1';

    app.use(`${apiBase}/${EModuleName.Auth}`, routers.get(EModuleName.Auth) as Router);

    app.use(`${apiBase}/${EModuleName.Posts}`, passport.authenticate(passportStrategy, passportOptions), routers.get(
        EModuleName.Posts,
    ) as Router);

    app.use(`${apiBase}/${EModuleName.Users}`, passport.authenticate(passportStrategy, passportOptions), routers.get(
        EModuleName.Users,
    ) as Router);
};
