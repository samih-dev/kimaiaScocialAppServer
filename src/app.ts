import express from 'express';
import dotenv from 'dotenv';

import { mwCommons, mwErrors } from './middlewares';
import { applyMiddleware, applyRoutes } from './utils';
import { routesMap } from './modules';

import dbConfig from './config/db.config';

const app = express();

dotenv.config();

dbConfig();

applyMiddleware(mwCommons, app);

// TOBE DELTEDED, just for debugging
//custom Middleware for logging the each request going to the API
app.use((req, res, next) => {
    if (req.body) console.info(req.body);
    if (req.params) console.info(req.params);
    if (req.query) console.info(req.query);
    console.info(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
    next();
});

applyRoutes(routesMap, app);

applyMiddleware(mwErrors, app);

export default app;
