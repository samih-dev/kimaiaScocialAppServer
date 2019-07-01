import { Application } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';

const handleCors = (app: Application) => app.use(cors({ credentials: true, origin: true }));

const handleBodyRequestParsing = (app: Application) => {
    app.use(parser.urlencoded({ extended: true }));
    app.use(parser.json());
};

const handleCompression = (app: Application) => {
    app.use(compression());
};

export default [handleCors, handleBodyRequestParsing, handleCompression];
