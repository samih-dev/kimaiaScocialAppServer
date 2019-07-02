import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import passport from 'passport';

import { passportConfig } from '../config';

const handleCors = (app: Application) => app.use(cors({ credentials: true, origin: true }));

const handleBodyRequestParsing = (app: Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};

const handleCookieParsing = (app: Application) => {
    app.use(cookieParser());
};

const handleCompression = (app: Application) => {
    app.use(compression());
};

const handleAuth = (app: Application) => {
    app.use(passport.initialize());
    passportConfig(passport);
};

export default [handleCors, handleBodyRequestParsing, handleCompression, handleCookieParsing, handleAuth];
