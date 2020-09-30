import {Request, Response} from 'express';
import { Client, clientModel } from '../models/clients';
import { badRequest, internalServerError } from '../services/util';

const insertClient = (req: Request, res: Response) => {
    {
        const client = req.body;
        if(!client)
            return badRequest(res, "Cliente inválido!");

        if(!client.name)
            return badRequest(res, "Nome do cliente não informado")

        if(!client.email)
            return badRequest(res, "Email não informado")

        if(!client.cpf)
            return badRequest(res, "CPF não informado")
        
        if(!client.telefone)
            return badRequest(res, "Número de telefone não informado")

        if(!client.data)
            return badRequest(res, "Data de nascimento não informada")
    }

    const client =  req.body as Client
    return clientModel.insertClient(client)
        .then(id => {
            res.json({
                id
            })
        })
        .catch(err => internalServerError(res, err))
}

const listClients = ({}: Request, res: Response) => {
    clientModel.listClients()
        .then(clients => {
            res.json(clients)
        })
        .catch(err => internalServerError(res, err))
}

export const clientController = {
    insertClient,
    listClients
}