import { Router } from 'express-serve-static-core';

import { router } from './auth';
// #region routers map
export enum EModuleName {
    Auth = 'auth',
    Posts = 'posts',
    Users = 'users',
}

const routesMap = new Map<string, Router>([[EModuleName.Auth, router]]);
// #endregion routers map

export { routesMap };
