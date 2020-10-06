import Router from 'express';
import {freeHoursController} from '../controllers/freehours';

const freeHoursRouter = Router();

freeHoursRouter.post('/', freeHoursController.insertHour)
freeHoursRouter.get('/', freeHoursController.listHours)
freeHoursRouter.get('/:id', freeHoursController.getHour)
freeHoursRouter.get('/company/:id', freeHoursController.getHourCompany)

export{
    freeHoursRouter
}