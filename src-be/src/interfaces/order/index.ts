import { DeleteResult, UpdateResult } from 'typeorm';

import Order from '../../entity/order';

interface IOrderRepository {
	find(query: object): Promise<Order[]>;
	findOne(query: object): Promise<Order>;
	save(query: object): Promise<Order>;
	update(query: object, payload: object): Promise<UpdateResult | Order>;
	updateOne(query: object, payload: object): Promise<UpdateResult>;
	findByIdAndUpdate(query: string, payload: object, )
}

interface IOrderService {
	readAll(typeField: string, typeTitle: string): Promise<Order[]>;
	readByUserId(id: string): Promise<Order[]>;
	readByOrderId(id: object): Promise<Order>;
	update(payload: Order): Promise<UpdateResult | Order>;
	updateOne(id: object, payload: object): Promise<UpdateResult>;
	delete(id: string): Promise<DeleteResult | void>;
	createUserOrder(payload: Order): Promise<Order>;
}

interface IDeletedOrder {
	deletedID: string;
}

interface IResponseBodyOrder {
	value: Order | Order[] | IDeletedOrder;
	statusMessage: string;
}

export { IOrderRepository, IOrderService, IDeletedOrder, IResponseBodyOrder }