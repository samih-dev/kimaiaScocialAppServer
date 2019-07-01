export * from './httpErrors';

import { Application, Router } from 'express-serve-static-core';
import { EModuleName } from '../modules';

type Wrapper = (app: Application) => void;

export const applyMiddleware = (middleware: Wrapper[], app: Application) => {
    for (const f of middleware) {
        f(app);
    }
};

export const applyRoutes = (routers: Map<string, Router>, app: Application) => {
    const apiBase = '/api/v1';

    app.use(`${apiBase}/${EModuleName.Auth}`, routers.get(EModuleName.Auth) as Router);
};
