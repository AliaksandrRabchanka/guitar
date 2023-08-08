import * as express from 'express';

import beConfig from '../../beConfig';
import chatRouter from './chat';

const apiWS = express
	.Router()
	// .use(beConfig.routes.chat, chatRouter)

export default apiWS;