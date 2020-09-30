import Router from 'express';
import {clientController} from '../controllers/clients';

const clientRouter = Router();

clientRouter.post('/', clientController.insertClient)
clientRouter.get('/', clientController.listClients)

export{
    clientRouter
}