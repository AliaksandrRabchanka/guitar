import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ObjectId } from "bson";

import Order from '../entity/order';
import { IOrderService, IResponseBodyOrder } from '../interfaces/order'
import { BasketService } from '../service';
import beConfig from '../../beConfig';

export class OrderController {
	private readonly service: IOrderService;
	private readonly basketService: BasketService;
	private readonly orderFieldName: string;
	private readonly orderFieldValue: string;

	public constructor({ service, basketService, orderFieldName, orderFieldValue }) {
		this.service = service;
		this.basketService = basketService;
		this.orderFieldName = orderFieldName;
		this.orderFieldValue = orderFieldValue;
	}

	public getUsersOrders() {
		return async (request: Request, response: Response): Promise<void> => {
			console.log('All orders was received');
			try {
				let orders;

				orders = await this.service.readAll(
					request.query[this.orderFieldName] as string,
					request.query[this.orderFieldValue] as string,
				);

				if (orders) {
					orders.map((basket) => basket.normalize());
				}
				response.status(200).send(orders || []);
			} catch (err) {
				console.log(err);
				response.status(500).send('System error. Please try again.');
			}
		}
	}

	public getOrdersByUserId() {
		return async (request: Request, response: Response): Promise<void> => {
			try {
				let orders;

				orders = await this.service.readByUserId(request.params.id);

				response.status(200).send(orders || []);
			} catch (err) {
				console.log(err);
				response.status(500).send('System error. Please try again.');
			}
		}
	}

	public createUserOrder() {
		return async (request: Request, response: Response): Promise<void> => {
			try {
				let userBasket;
				let newBasket = [];
				let newPayload;

				const {userId } = request.body;
				const order = await this.service.createUserOrder(request.body);

				if (order) {
					userBasket = await this.basketService.readOne(userId);
					if (userBasket) {
						userBasket.normalize();
						userBasket.basket.forEach((product: string) => {
							if (order.products.indexOf(product) < 0) {
								newBasket.push(product)
							}
						});
						newPayload = {
							...userBasket,
							basket: newBasket
						}
						await this.basketService.update(newPayload);
					}
				}

				const responseBody = {
					value: await this.basketService.readOne(userId),
					statusMessage: beConfig.serverMessages.order.created
				};
				response.status(200).send(responseBody)
			} catch (err) {
				console.log(err);
				response.status(500).send('System error. Please try again.');
			}
		}
	}

	public updateUserOrder() {
		return async (request: Request, response: Response): Promise<void> => {
			try {
				let orders;
				const id = new ObjectId(request.params.id);

				await this.service.updateOne(id, request.body);
				orders = await this.service.readByOrderId(id)

				const responseBody: IResponseBodyOrder = {
					value: orders,
					statusMessage: beConfig.serverMessages.order.updated
				};
				response.status(200).send(responseBody);
			} catch (err) {
				console.log(err);
				response.status(500).send('System error. Please try again.');
			}
		}
	}

	public deleteUserOrder() {
		return async (request: Request, response: Response): Promise<void> => {
			console.log(`Order with id:${request.params.id} was deleted`);
		}
	}
}