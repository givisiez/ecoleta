import express from 'express';
import path from 'path';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

const portServer = process.env.SERVER_PORT;
const app = express();

/* ? informar no cors o dominio da plicacao {origin: '127.0.0.1'} */
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

dotenv.config();

app.listen(portServer);