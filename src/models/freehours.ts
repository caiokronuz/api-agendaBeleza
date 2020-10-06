import {dbQuery, dbQueryFirst} from '../services/db';

export type FreeHours = {
    id_hours: number,
    id_company: number,
    from_hour: string,
    to_hour: string,
    week_day: string,
}

const insertHour = async (freehours: FreeHours) => {
    await dbQuery(`INSERT INTO freehours (id_company, from_hour, to_hour, week_day) VALUES (?, ?, ?, ?)`,
    [freehours.id_company, freehours.from_hour, freehours.to_hour, freehours.week_day])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'freehours'`);
    return retorno[0].Id as number | undefined;
}

const listHours = async () => {
    const retorno = await dbQuery(`SELECT * FROM 'freehours'`);
    return retorno as FreeHours[];
}

const getHour = async (id_hour: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM freehours WHERE id_hours = ?`, [id_hour]);
    return retorno as FreeHours | undefined
}

const getHourCompany = async (id_company: number) => {
    const retorno = await dbQuery(`SELECT * FROM freehours WHERE id_company = ?`, [id_company]);
    return retorno as FreeHours[];
}

//atualizar horario 

//deletar horario

export const freeHoursModel = {
    insertHour,
    listHours,
    getHour,
    getHourCompany
}