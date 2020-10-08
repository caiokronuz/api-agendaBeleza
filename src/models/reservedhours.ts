import {dbQuery, dbQueryFirst} from '../services/db';

export type ReservedHours = {
    id_rhours: number,
    id_company: number,
    id_client: number,
    from_hour: string,
    to_hour: string,
    week_day: number,
}

const insertReservedHour = async(reservedhours: ReservedHours) => {
    await dbQuery(`INSERT INTO reservedhours (id_company, id_client, from_hour, to_hour, week_day) VALUES (?, ?, ?, ?, ?)`,
    [reservedhours.id_company, reservedhours.id_client, reservedhours.from_hour, reservedhours.to_hour, reservedhours.week_day])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'reservedhours'`);
    return retorno[0].Id as number | undefined;
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

export const reservedHoursModel = {
    insertReservedHour,
    listReservedHours,
    getReservedHour,
    getReservedHourCompany,
    getReservedHourClient,
}