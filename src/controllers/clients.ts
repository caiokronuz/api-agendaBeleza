import {Request, Response} from 'express';
import { Client, clientModel } from '../models/clients';
import { badRequest, internalServerError, notFound } from '../services/util';

const insertClient = async (req: Request, res: Response) => {
    {
        const client = req.body;
        if(!client)
            return badRequest(res, "Cliente inválido!");

        if(!client.name)
            return badRequest(res, "Nome do cliente não informado")

        if(!client.email)
            return badRequest(res, "Email não informado")

        if(!client.pass)
            return badRequest(res, "Senha não informado")
        
        if(!client.telefone)
            return badRequest(res, "Número de telefone não informado")

        if(!client.data)
            return badRequest(res, "Data de nascimento não informada")

        const clientSaved = await clientModel.getEmail(client.email);
            if(clientSaved)
                return badRequest(res, "Já existe uma conta com esse email!");
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

const updateClient = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id>0))
            return badRequest(res, "ID INVÁLIDO!")
        
        const client = req.body;

        if(!client)
            return badRequest(res, 'Cliente inválido!')
        
        if(!client.name)
            return badRequest(res, "Nome não informado")

        if(!client.email)
            return badRequest(res, "Email não informado")

        if(!client.pass)
            return badRequest(res, "Senha não informada")

        if(!client.telefone)
            return badRequest(res, "Telefone não informado")

        if(!client.data)
            return badRequest(res, "Data não informada")

        const clientSaved = await clientModel.getClient(id);
        if(!clientSaved)
            return notFound(res);
    }

    const client = req.body as Client;
    return clientModel.updateClient(client)
        .then(client => {
            res.json(client)
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

const getClient = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id>0))
            return badRequest(res, "ID INVÁLIDO!");
    }
    return clientModel.getClient(id)
        .then((client) => {
            if(client)
                return res.json(client);
            else 
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const getLogin = (req: Request, res: Response) => {
    {
        const client = req.body;

        if(!client)
            return badRequest(res ,'Você deve mandar o email e a senha')
        
        if(!client.email)
            return badRequest(res, "O email deve ser preenchido")

        if(!client.pass)
            return badRequest(res, "A senha deve ser preenchida")
    }

    const client = req.body
    return clientModel.getLogin(client.email, client.pass)
        .then(client => {
            return res.json(client)
        })
        .catch(err => internalServerError(res, err));

}

const deleteClient = async (req:Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id>0))
            return badRequest(res, "ID INVÁLIDO!")

        const clientSaved = await clientModel.getClient(id);
        if(!clientSaved)
            return notFound(res);
    }

    return clientModel.deleteClient(id)
        .then(() => {
            return res.sendStatus(200)
        })
        .catch(err => internalServerError(res, err))
}

export const clientController = {
    insertClient,
    updateClient,
    listClients,
    getClient,
    getLogin,
    deleteClient
}