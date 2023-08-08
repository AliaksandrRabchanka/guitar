import * as express from 'express';
import beConfig from '../../../beConfig';
import { BuildVersionController } from '../../controller';

const controller = new BuildVersionController(beConfig.beBuild);

export default express.Router().get('', controller.getBuildVersion());