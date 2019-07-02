import express from 'express';
import httpStatus from 'http-status';

import { AuthService } from './authService';

const router = express.Router();

router.post('/loginOrRegister', async (req, res) => {
    const { username, password } = req.body;

    const loginOrRegRes = await AuthService.loginOrRegister(username, password);

    let statusCode = loginOrRegRes.created ? httpStatus.CREATED : httpStatus.OK;
    res.status(statusCode).send(loginOrRegRes);
});

export { router };
