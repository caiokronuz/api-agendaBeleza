import Router from 'express';
import {freeHoursController} from '../controllers/freehours';

const freeHoursRouter = Router();

freeHoursRouter.post('/', freeHoursController.insertHour)
freeHoursRouter.put('/:id', freeHoursController.updateHour)
freeHoursRouter.get('/', freeHoursController.listHours)
freeHoursRouter.get('/:id', freeHoursController.getHour)
freeHoursRouter.get('/company/:id', freeHoursController.getHourCompany)
freeHoursRouter.delete('/:id', freeHoursController.deleteFreeHours)

export{
    freeHoursRouter
}