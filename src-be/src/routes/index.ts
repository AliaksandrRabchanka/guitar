import * as express from 'express';
import api from './api';
import apiWsRouter from './api-ws';

const routes = express.Router();

routes.use('/api/v1', api);
// routes.use('/api-ws/v1', apiWsRouter).use('/api/v1', api);

export default routes;
