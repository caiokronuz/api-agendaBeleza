import {dbQuery, dbQueryFirst} from '../services/db';

export type ReservedHours = {
    id_rhours: number,
    id_company: number,
    name_company: string,
    id_client: number,
    name_client: string,
    telefone_client: string,
    from_hour: string,
    to_hour: string,
    week_day: number,
}

const insertReservedHour = async(reservedhours: ReservedHours) => {
    await dbQuery(`INSERT INTO reservedhours (id_company, name_company, id_client, name_client, telefone_client, from_hour, to_hour, week_day) VALUES (? ,?, ?, ?, ?, ?, ?, ?)`,
    [reservedhours.id_company, reservedhours.name_company, reservedhours.id_client, reservedhours.name_client, reservedhours.telefone_client, reservedhours.from_hour, reservedhours.to_hour, reservedhours.week_day])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'reservedhours'`);
    return retorno[0].Id as number | undefined;
}

const updateReservedHour = async (reservedhours: ReservedHours) => {
    await dbQuery(`UPDATE reservedhours SET id_company = ?, SET name_company =?, id_client = ?, name_client = ?, telefone_client = ?, from_hour = ?, to_hour = ?, week_day = ? WHERE id_rhours = ?`,
    [reservedhours.id_company, reservedhours.name_company, reservedhours.id_client, reservedhours.name_client, reservedhours.telefone_client, reservedhours.from_hour, reservedhours.to_hour, reservedhours.week_day, reservedhours.id_rhours]);
    return getReservedHour(reservedhours.id_rhours)
}

const listReservedHours = async () => {
    const retorno = await dbQuery(`SELECT * FROM 'reservedhours'`);
    return retorno as ReservedHours[];
}

const getReservedHour = async (id_rhour: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM reservedhours WHERE id_rhours = ?`, [id_rhour]);
    return retorno as ReservedHours | undefined;
}

const getReservedHourCompany = async (id_company: number) => {
    const retorno = await dbQuery(`SELECT * FROM reservedhours WHERE id_company = ?`, [id_company]);
    return retorno as ReservedHours[];
}

const getReservedHourClient = async (id_client: number) => {
    const retorno = await dbQuery(`SELECT * FROM reservedhours WHERE id_client = ?`, [id_client]);
    return retorno as ReservedHours[];
}

const deleteReservedHour = async (id_hours:number) => {
    await dbQueryFirst (`DELETE FROM reservedhours WHERE id_rhours = ?`, [id_hours])
}

export const reservedHoursModel = {
    insertReservedHour,
    updateReservedHour,
    listReservedHours,
    getReservedHour,
    getReservedHourCompany,
    getReservedHourClient,
    deleteReservedHour,
}