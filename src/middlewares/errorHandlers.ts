import { Request, Response, NextFunction, Application } from 'express';
import { HTTPClientError, HTTP404Error } from '../utils';

const handle404Error = (app: Application) => {
    app.use((req: Request, res: Response) => {
        throw new HTTP404Error('handler for the path requested, not found.');
    });
};

const handleClientErrors = (app: Application) => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof HTTPClientError) {
            console.error(err);
            res.status(err.statusCode).send(err.message);
        } else {
            next(err);
        }
    });
};

const handleServerErrors = (app: Application) => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err);
        if (process.env.NODE_ENV === 'production') {
            res.status(500).send('Internal Server Error');
        } else {
            res.status(500).send(err.stack);
        }
    });
};

export default [handle404Error, handleClientErrors, handleServerErrors];
