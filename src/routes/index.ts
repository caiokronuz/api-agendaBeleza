import Router, {Application} from 'express';

import {clientRouter} from './client';
import {companyRouter} from './company';
import {freeHoursRouter} from './freehours'
import {reservedHoursRouter} from './reservedhours';

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/clients', clientRouter)
    apiRouter.use('/company', companyRouter)
    apiRouter.use('/freehours', freeHoursRouter)
    apiRouter.use('/reservedhours', reservedHoursRouter)

    app.use('/api/v1', apiRouter)
}
