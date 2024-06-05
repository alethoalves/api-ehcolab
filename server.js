import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import { reqIntercepter } from './src/middlewares/reqIntercepter.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import publicRoutes from "./src/routes/public.js";
import routerAuth from './src/routes/authRoute.js';
import privateRoutes from './src/routes/privateRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Middleware para tratamento de erros de parsing JSON
app.use(errorHandler);

app.all('*',reqIntercepter);

app.use('/auth', routerAuth);
app.use('/private', privateRoutes);

app.use('/',publicRoutes);

app.listen(process.env.PORT,()=>{
  console.log(`🚀 Servidor rodando na porta ${process.env.BASE}`)
})

