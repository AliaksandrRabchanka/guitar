import * as express from 'express';

import beConfig from '../../beConfig';

import buildVersionRouter from './build-version';
import loginRouter from './login';
import productsRouter from './products';
import basketRouter from './basket';
import orderRouter from './order';
import chatRouter from './chat';

const api = express
  .Router()
  .use(beConfig.routes.buildVersion, buildVersionRouter)
	.use(beConfig.routes.login, loginRouter)
	.use(beConfig.routes.products, productsRouter)
	.use(beConfig.routes.basket, basketRouter)
	.use(beConfig.routes.order, orderRouter);
	// .use(beConfig.routes.chat, chatRouter);

export default api;
