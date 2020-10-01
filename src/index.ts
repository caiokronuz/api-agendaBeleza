import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {useRoutes} from './routes';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(cors());
useRoutes(app)

app.listen(3333)