import Router, {Application} from 'express';
import {clientRouter} from './client';

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/clients', clientRouter)

    app.use('/api/v1', apiRouter)
}
