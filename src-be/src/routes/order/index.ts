import * as express from 'express';
import { getManager } from 'typeorm';


import { OrderController } from '../../controller';
import { BasketService, OrderService } from '../../service';
import Order from '../../entity/order';
import { IOrderService, IDeletedOrder, IResponseBodyOrder } from '../../interfaces/order'

import beConfig from '../../../beConfig';
import Basket from "../../entity/basket";

const repository = getManager(beConfig.connectionsName.toMongo).getRepository(Order);
const service = new OrderService(repository);
const repositoryBasket = getManager(beConfig.connectionsName.toMongo).getRepository(Basket);
const basketService = new BasketService(repositoryBasket);

const { fieldName, fieldValue } = beConfig.findingFields;

const controller = new OrderController({
	service,
	basketService,
	orderFieldName: fieldName,
	orderFieldValue: fieldValue,
});

export default express
	.Router()
	.get('', controller.getUsersOrders())
	.get('/:id', controller.getOrdersByUserId())
	.post('', controller.createUserOrder())
	.put('/:id', controller.updateUserOrder())
	.patch('/:id', controller.updateUserOrder())
	.delete('/:id', controller.deleteUserOrder());