import * as express from 'express';
import { getManager } from 'typeorm';


import { BasketController } from '../../controller';
import { BasketService } from '../../service';
import Basket from '../../entity/basket';

import beConfig from '../../../beConfig';

const repository = getManager(beConfig.connectionsName.toMongo).getRepository(Basket);
const service = new BasketService(repository);

const { fieldName, fieldValue } = beConfig.findingFields;

const controller = new BasketController({
	service,
	basketFieldName: fieldName,
	basketFieldValue: fieldValue,
});

export default express
	.Router()
	.get('', controller.getUsersBaskets())
	.get('/:id', controller.getBasketByUserId())
	.post('', controller.updateUserBasket())
	.put('/:id', controller.updateUserBasket())
	.delete('/:id', controller.deleteUserBasket());