import {dbQuery, dbQueryFirst} from '../services/db';

export type Company = {
    id: number,
    name: string,
    email: string,
    cnpj: string,
    tel: string,
    endereco: string,
    pass: string,
}

const insertCompany = async (company: Company) => {
    await dbQuery(`INSERT INTO company (name, email, cnpj, tel, endereco, pass) VALUES (?, ?, ?, ? , ?, ?)`,
    [company.name, company.email, company.cnpj, company.tel, company.endereco, company.pass])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'company'`);
    return retorno[0].Id as number | undefined;
}

const getEmail = async (email: string) => {
    const retorno = await dbQueryFirst(`SELECT email FROM company WHERE email = ?`, [email]);
    return retorno as Company | undefined
}

const getCnpj = async (cnpj: string) => {
    const retorno = await dbQueryFirst(`SELECT cnpj FROM company WHERE cnpj = ?`, [cnpj]);
    return retorno as Company | undefined
}

const getLogin = async (email: string, pass: string) => {
    const retorno = await dbQuery(`SELECT id FROM company WHERE email = ? AND pass = ?`, [email, pass])
    return retorno[0];
}

export const companyModel = {
    insertCompany,
    getEmail,
    getCnpj,
    getLogin,
}