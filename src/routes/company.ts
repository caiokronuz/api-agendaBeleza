import Router from 'express';
import {companyController} from '../controllers/company';

const companyRouter = Router();

companyRouter.post('/', companyController.insertCompany)
companyRouter.post('/login', companyController.getLogin)

export{
    companyRouter
}