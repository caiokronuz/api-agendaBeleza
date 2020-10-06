import {Request, Response} from 'express';
import {FreeHours, freeHoursModel} from '../models/freehours';
import { badRequest, internalServerError, notFound } from '../services/util';

const insertHour = (req: Request, res: Response) => {
    {
        const freehour = req.body;
        if(!freehour)
            return badRequest(res, "Dados inválida")
        
        if(!freehour.id_company)
            return badRequest(res, "Salão inválido")

        if(!freehour.from_hour)
            return badRequest(res, "Hora inicial inválida")

        if(!freehour.to_hour)
            return badRequest(res, "Hora final inválida")

        if(!freehour.week_day)
            return badRequest(res, "Dia da semana inválido")

    }

    const freehour = req.body as FreeHours
    return freeHoursModel.insertHour(freehour)
        .then(id => {
            res.json({
                id
            })
        })
        .catch(err => internalServerError(res, err))
}

const listHours = ({}: Request, res: Response) => {
    freeHoursModel.listHours()
        .then(hours => {
            res.json(hours)
        })
        .catch(err => internalServerError(res, err))
}

const getHour = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id>0))
            return badRequest(res, "ID Inválido!");
    }
    return freeHoursModel.getHour(id)
        .then((hour) => {
            if(hour)
                return res.json(hour);
            else   
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const getHourCompany = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id>0))
            return badRequest(res, "ID Inválido!");
    }
    return freeHoursModel.getHourCompany(id)
        .then((hour) => {
            if(hour)
                return res.json(hour);
            else   
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

export const freeHoursController = {
    insertHour,
    listHours,
    getHour,
    getHourCompany
}