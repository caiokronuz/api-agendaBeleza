import Router, {Application} from 'express';

import {clientRouter} from './client';
import {companyRouter} from './company';
import {freeHoursRouter} from './freehours'

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/clients', clientRouter)
    apiRouter.use('/company', companyRouter)
    apiRouter.use('/freehours', freeHoursRouter)

    app.use('/api/v1', apiRouter)
}
