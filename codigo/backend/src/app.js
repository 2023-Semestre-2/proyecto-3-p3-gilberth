import express from "express";
import cors from 'cors';  // Importa CORS usando ES6 syntax

import config from "./config";
import usersRoute from './routes/users.routes';
import booksRoute from './routes/books.routes';
import exchangeOffersRoute from './routes/exchangeOffers.routes';



const corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200 // Algunos navegadores heredados (IE11, varios SmartTVs) fallan con 204
  };
  


const app = express()
app.use(cors(corsOptions));
app.set('port', config.port)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(usersRoute)
app.use(booksRoute)
app.use(exchangeOffersRoute)


export default app
