import Router from 'express';
import {clientController} from '../controllers/clients';

const clientRouter = Router();

clientRouter.post('/', clientController.insertClient)
clientRouter.put('/:id', clientController.updateClient)
clientRouter.get('/', clientController.listClients)
clientRouter.get('/:id', clientController.getClient)
clientRouter.post('/login', clientController.getLogin)
clientRouter.delete('/:id', clientController.deleteClient)

export{
    clientRouter
}