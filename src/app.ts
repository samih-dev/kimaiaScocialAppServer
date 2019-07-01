import express from 'express';

import { mwCommons, mwErrors } from './middlewares';
import { applyMiddleware, applyRoutes } from './utils';
import { routesMap } from './modules';

const app = express();

applyMiddleware(mwCommons, app);

applyRoutes(routesMap, app);

applyMiddleware(mwErrors, app);

export default app;
