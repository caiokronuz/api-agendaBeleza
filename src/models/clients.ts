import { dbQuery } from "../services/db"

export type Client = {
    id: number,
    name: string,
    email: string,
    cpf: number,
    telefone: number,
    data: string,
}

const insertClient = async (client: Client) => {
    await dbQuery(`INSERT INTO clients (name, email, cpf, telefone, data) VALUES (?, ?, ?, ?, ?)`,
     [client.name, client.email, client.cpf, client.telefone, client.data])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'clients'`);
    return retorno[0].Id as number | undefined;
}

const listClients = async () => {
    const retorno = await dbQuery(`SELECT * FROM 'clients'`);
    return retorno as Client[];
}

export const clientModel = {
    insertClient,
    listClients
}