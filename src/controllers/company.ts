import {Request, Response} from 'express';
import {Company, companyModel} from '../models/company';
import { badRequest, internalServerError, notFound } from '../services/util';

const insertCompany = async (req: Request, res: Response) => {

    {
        const company = req.body;

        if(!company)
            return badRequest(res, "Empresa inválida!")
        
        if(!company.name)
            return badRequest(res, "Nome da empresa não informado")

        if(!company.email)
            return badRequest(res, "Email da empresa não informado")

        if(!company.cnpj)
            return badRequest(res, "CNPJ da empresa nao informado")

        if(!company.tel)
            return badRequest(res, "Telefone da empresa não informado")

        if(!company.endereco)
            return badRequest(res, "Endereço da empresa não informado")

        if(!company.pass)
            return badRequest(res, "Senha não informada!")

        const companySaved = await companyModel.getEmail(company.email);
        if(companySaved)
            return badRequest(res, "Já existe uma conta com esse email!");

        const cnpjSaved = await companyModel.getCnpj(company.cnpj);
        if(cnpjSaved)
            return badRequest(res, "Já existe uma conta com esse CNPJ!");

    }   

    const company = req.body as Company
    return companyModel.insertCompany(company)
        .then(id => {
            res.json({
                id
            })
        })
        .catch(err => internalServerError(res, err))
}

const updateCompany = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id > 0))
            return badRequest(res, 'ID INVÁLIDO')

        const company = req.body;

        if(!company)
            return badRequest(res, 'Empresa inválido!')
            
        if(!company.name)
            return badRequest(res, "Nome não informado!")

        if(!company.email)
            return badRequest(res, "Email não informado!")

        if(!company.cnpj)
            return badRequest(res, "Cnpj não informado!")

        if(!company.tel)
            return badRequest(res, "Telefone não informado!")

        if(!company.endereco)
            return badRequest(res, "Endereço não informado!")

        if(!company.pass)
            return badRequest(res, "Senha não informada!")

        const companySaved = await companyModel.getCompany(id)
        
        if(!companySaved)
            return notFound(res);
    }

    const company = req.body as Company;
    return companyModel.updateCompany(company)
        .then(company => {
            res.json(company)
        })
        .catch(err => internalServerError(res, err))
}

const listCompany = ({}: Request, res: Response) => {
    companyModel.listCompany()
        .then(company => {
            res.json(company)
        })
        .catch(err => internalServerError(res,err))
}

const getCompany = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!(id > 0))
            return badRequest(res, 'ID INVÁLIDO!');
    }
    return companyModel.getCompany(id)
        .then((company) => {
            if(company)
                return res.json(company);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const getLogin = (req: Request, res: Response) => {
    {
        const company = req.body;

        if(!company)
            return badRequest(res, "Você deve enviar o email e a senha")

        if(!company.email)
            return badRequest(res, "O email deve ser preenchido")

        if(!company.pass)
            return badRequest(res, "O campo de senha deve ser preenchido")
    }

    const company = req.body
    return companyModel.getLogin(company.email, company.pass)
        .then(id => {
            return res.json(id)
        })
        .catch(err => internalServerError(res, err))
}

const deleteCompany = async (req:Request, res: Response) => {
    const id = parseInt(req.params.id);

    {
        if(!(id>0))
            return badRequest(res, "ID INVALIDO!")
        
        const companySaved = await companyModel.getCompany(id);
            if(!companySaved)
                return notFound(res);
    }

    return companyModel.deleteCompany(id)
        .then(() =>{
            return res.sendStatus(200)
        })
        .catch (err => internalServerError(res, err))
} 

export const companyController = {
    insertCompany,
    updateCompany,
    listCompany,
    getCompany,
    getLogin,
    deleteCompany,
}