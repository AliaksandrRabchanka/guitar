import * as express from 'express';
import { getManager } from 'typeorm';


import { UserController } from '../../controller';
import { UserService } from '../../service';
import User from '../../entity/user';
import Basket from '../../entity/basket';

import beConfig from '../../../beConfig';
import { BasketService, IBasketRepository } from "../../service/basket.service";

const repository = getManager(beConfig.connectionsName.toMongo).getRepository(User);
const service = new UserService(repository);
const repositoryBasket = getManager(beConfig.connectionsName.toMongo).getRepository(Basket);
const basketService = new BasketService(repositoryBasket);

const { fieldName, fieldValue } = beConfig.findingFields;

const controller = new UserController({
	service,
	userFieldName: fieldName,
	userFieldValue: fieldValue,
	basketService: basketService
});

export default express
	.Router()
	.get('', controller.getUsers())
	.get('/:id', controller.getUser())
	.post('', controller.checkUser())
	.put('/:id', controller.updateUser())
	.delete('/:id', controller.deleteUser());