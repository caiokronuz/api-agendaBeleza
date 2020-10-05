import Router, {Application} from 'express';
import {clientRouter} from './client';
import {companyRouter} from './company';

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/clients', clientRouter)
    apiRouter.use('/company', companyRouter)

    app.use('/api/v1', apiRouter)
}
