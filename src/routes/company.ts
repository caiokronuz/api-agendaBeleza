import Router from 'express';
import {companyController} from '../controllers/company';

const companyRouter = Router();

companyRouter.post('/', companyController.insertCompany)
companyRouter.put('/:id', companyController.updateCompany)
companyRouter.get('/', companyController.listCompany)
companyRouter.get('/:id', companyController.getCompany )
companyRouter.post('/login', companyController.getLogin)
companyRouter.delete('/:id', companyController.deleteCompany)

export{
    companyRouter
}