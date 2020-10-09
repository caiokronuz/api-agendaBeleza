import {Request, Response} from 'express';
import {ReservedHours, reservedHoursModel} from '../models/reservedhours';
import { badRequest, internalServerError, notFound } from '../services/util';

const insertReservedHour = (req: Request, res: Response) => {
    {
        const reservedhour = req.body;

        if(!reservedhour)
            return badRequest(res, "Dados inválidos!")
        
        if(!reservedhour.id_company)
            return badRequest(res, "Salão inválido!")

        if(!reservedhour.name_company)
            return badRequest(res, "Salão inválido!")
        
        if(!reservedhour.id_client)
            return badRequest(res, "Cliente inválido!")

        if(!reservedhour.name_client)
            return badRequest(res, 'Cliente inválido!')

        if(!reservedhour.telefone_client)
            return badRequest(res, 'Telefone cliente inválido!')

        if(!reservedhour.from_hour)
            return badRequest(res, "Horário inicial inválido!")

        if(!reservedhour.to_hour)
            return badRequest(res, "Horário final inválido!")

        if(!reservedhour.week_day)
            return badRequest(res, "Dia da semana inválido!")
    }

    const reservedhour = req.body as ReservedHours;
    return reservedHoursModel.insertReservedHour(reservedhour)
        .then(id => {
            res.json({
                id
            })
        })
        .catch(err => internalServerError(res, err))
}

const updateReservedHour = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id > 0))
            return badRequest(res, 'ID Inválido')

        const reservedhour = req.body;

        if(!reservedhour.id_company)
            return badRequest(res, 'Salão inválido')

        if(!reservedhour.name_company)
            return badRequest(res, "Salão inválido!")

        if(!reservedhour.id_client)
            return badRequest(res, 'Usuário inválido')

        if(!reservedhour.name_client)
            return badRequest(res, 'Cliente inválido!')

        if(!reservedhour.telefone_client)
            return badRequest(res, 'Telefone cliente inválido!')

        if(!reservedhour.from_hour)
            return badRequest(res, 'Horário inicial inválido')

        if(!reservedhour.to_hour)
            return badRequest(res, 'Horário final inválido')

        if(!reservedhour.week_day)
            return badRequest(res, 'Dia da semana inválido')

        const reservedHourSaved = await reservedHoursModel.getReservedHour(id)

        if(!reservedHourSaved)
            return notFound(res);
    }

    const  reservedhour = req.body as ReservedHours;
    return reservedHoursModel.updateReservedHour(reservedhour)
        .then(reservedhour=>{
            res.json(reservedhour)
        })
        .catch(err => internalServerError(res, err))
}

const listReservedHours = ({}: Request, res: Response) => {
    reservedHoursModel.listReservedHours()
        .then(hours => {
            res.json(hours)
        })
        .catch(err => internalServerError(res, err))
}

const getReservedHour = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    {
        if(!(id>0))
            return badRequest(res, "Id inválido!");
    }

    return reservedHoursModel.getReservedHour(id)
        .then((hour) => {
            if(hour)
                return res.json(hour);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err))
}

const getReservedHourCompany = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    {
        if(!(id>0))
            return badRequest(res, "Id inválido!");
    }

    return reservedHoursModel.getReservedHourCompany(id)
        .then((hour) => {
            if(hour)
                return res.json(hour);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err))
}

const getReservedHourClient = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    {
        if(!(id>0))
            return badRequest(res, "Id inválido!");
    }

    return reservedHoursModel.getReservedHourClient(id)
        .then((hour) => {
            if(hour)
                return res.json(hour);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err))
}

const deleteReservedHours = async (req: Request, res: Response) => {
    const id = parseInt (req.params.id);

    {
        if(!(id>0))
            return badRequest (res, "ID INVALIDO!")

        const reservedHoursSaved = await reservedHoursModel.getReservedHour(id);
            if(!reservedHoursSaved)
                return notFound(res)
    }

    return reservedHoursModel.deleteReservedHour(id)
        .then   (() =>{
            return res.sendStatus(200)
        })
        .catch (err => internalServerError(res,err))
}

export const reservedHoursController = {
    insertReservedHour,
    updateReservedHour,
    listReservedHours,
    getReservedHour,
    getReservedHourCompany,
    getReservedHourClient,
    deleteReservedHours,
}