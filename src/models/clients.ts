import { dbQuery, dbQueryFirst } from "../services/db"

export type Client = {
    id: number,
    name: string,
    email: string,
    pass: string,
    telefone: string,
    data: string,
}

const insertClient = async (client: Client) => {
    await dbQuery(`INSERT INTO clients (name, email, pass, telefone, data) VALUES (?, ?, ?, ?, ?)`,
     [client.name, client.email, client.pass, client.telefone, client.data])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'clients'`);
    return retorno[0].Id as number | undefined;
}

const updateClient = async (client: Client) => {
    await dbQuery(`UPDATE clients SET name = ?, email = ?, pass = ?, telefone = ?, data = ? where id = ?`,
    [client.name, client.email, client.pass, client.telefone, client.data, client.id]);
    return getClient(client.id);
}

const listClients = async () => {
    const retorno = await dbQuery(`SELECT * FROM 'clients'`);
    return retorno as Client[];
}

const getClient = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM clients WHERE id =  ?`, [id]);
    return retorno as Client | undefined
}

const getEmail = async (email: string) => {
    const retorno = await dbQueryFirst(`SELECT email FROM clients WHERE email = ?`, [email]);
    return retorno as Client | undefined
}

const getLogin = async (email: string, pass: string) => {
   const retorno = await dbQuery(`SELECT id FROM clients WHERE email = ? AND pass = ?`, [email, pass])
   return retorno[0];
}

const deleteClient = async (id:number) => {
    await dbQueryFirst(`DELETE FROM clients WHERE id = ?`, [id]);
}

export const clientModel = {
    insertClient,
    listClients,
    updateClient,
    getClient,
    getEmail,
    getLogin,
    deleteClient,
}