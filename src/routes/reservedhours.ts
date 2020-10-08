import Router from 'express';
import {reservedHoursController} from '../controllers/reservedhours';

const reservedHoursRouter = Router();

reservedHoursRouter.post('/', reservedHoursController.insertReservedHour);
reservedHoursRouter.get('/', reservedHoursController.listReservedHours);
reservedHoursRouter.get('/:id', reservedHoursController.getReservedHour);
reservedHoursRouter.get('/company/:id', reservedHoursController.getReservedHourCompany);
reservedHoursRouter.get('/client/:id', reservedHoursController.getReservedHourClient);

export{
    reservedHoursRouter
}