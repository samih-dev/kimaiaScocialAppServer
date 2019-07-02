import { Router } from 'express-serve-static-core';

import { router as authRouter } from './auth';
import { router as postsRouter } from './posts';
import { router as usersRouter } from './users';
// #region routers map
export enum EModuleName {
    Auth = 'auth',
    Posts = 'posts',
    Users = 'users',
}

const routesMap = new Map<string, Router>([
    [EModuleName.Auth, authRouter],
    [EModuleName.Posts, postsRouter],
    [EModuleName.Users, usersRouter],
]);
// #endregion routers map

export { routesMap };
