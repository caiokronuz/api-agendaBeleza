import Router from 'express';
import {reservedHoursController} from '../controllers/reservedhours';

const reservedHoursRouter = Router();

reservedHoursRouter.post('/', reservedHoursController.insertReservedHour);
reservedHoursRouter.put('/:id', reservedHoursController.updateReservedHour);
reservedHoursRouter.get('/', reservedHoursController.listReservedHours);
reservedHoursRouter.get('/:id', reservedHoursController.getReservedHour);
reservedHoursRouter.get('/company/:id', reservedHoursController.getReservedHourCompany);
reservedHoursRouter.get('/client/:id', reservedHoursController.getReservedHourClient);
reservedHoursRouter.delete('/:id', reservedHoursController.deleteReservedHours)

export{
    reservedHoursRouter
}