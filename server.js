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

const runServer = (port, server) => {
  server.listen(port,()=>{
    console.log(`🚀 Servidor rodando na porta ${port}`);
  })
}

const developmentServer = http.createServer(app)

if(process.env.NODE_ENV === 'production'){
  //TODO: configurar SSL
  //TODO: rodar o server na porta 80 e na porta 443
} else {
  const serverPort = process.env.PORT ? parseInt(process.env.PORT) : 9000
  runServer(serverPort, developmentServer)
}