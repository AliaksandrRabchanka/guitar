import * as express from 'express';
import { ChatController } from '../../controller';

const controller = new ChatController();

export default express.Router().get('', controller.sendResponse());