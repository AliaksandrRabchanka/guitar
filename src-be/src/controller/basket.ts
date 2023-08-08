import { Request, Response } from 'express';
import { DeleteResult, ObjectID, UpdateResult } from 'typeorm';

import Basket from '../entity/product';
import beConfig from '../../beConfig';

interface IBasketService {
	readAll(typeField: string, typeTitle: string): Promise<Basket[]>;
	readOne(id: string): Promise<Basket>;
	update(payload: Basket): Promise<UpdateResult | Basket>;
	delete(id: string): Promise<DeleteResult | void>;
	create(payload: Basket): Promise<Basket>;
}
interface IDeletedBasket {
	deletedID: string;
}

interface IResponseBodyBasket {
	value: Basket | Basket[] | IDeletedBasket;
	statusMessage: string;
}

export class BasketController {
	private readonly service: IBasketService;
	private readonly basketFieldName: string;
	private readonly basketFieldValue: string;

	public constructor({ service, basketFieldName, basketFieldValue }) {
		this.service = service;
		this.basketFieldName = basketFieldName;
		this.basketFieldValue = basketFieldValue;
	}


	public getUsersBaskets() {
		return async (request: Request, response: Response): Promise<void> => {
			try {
				let baskets;

				baskets = await this.service.readAll(
					request.query[this.basketFieldName] as string,
					request.query[this.basketFieldValue] as string,
				);

				if (baskets) {
					baskets.map((basket) => basket.normalize());
				}
				response.status(200).send(baskets || []);
			} catch (err) {
				console.log(err);
				response.status(500).send('System error. Please try again.');
			}
		};
	}

	public getBasketByUserId() {
		return async (request: Request, response: Response): Promise<void> => {
			try {
				let userBasket;

				userBasket = await this.service.readOne(request.params.id);

				if (userBasket) {
					userBasket.normalize();
				}
				response.status(200).send(userBasket || []);
				console.log(`Basket for user with id:${request.params.id} was got`);
			} catch (err) {
				console.log(err);
				response.status(500).send('System error. Please try again.');
			}
		};
	}

	public updateUserBasket() {
		return async (request: Request, response: Response): Promise<void> => {
			try {
				const {userId, productId, operationType } = request.body;
				let userBasket;
				let newPayload;
				let message;

				userBasket = await this.service.readOne(userId);
				if (userBasket) {
					userBasket.normalize();
				}

				if (operationType === beConfig.ProductOperationType.delete) {
					const newBasket = userBasket.basket.filter((product) => product !== productId)
					newPayload = {
						...userBasket,
						basket: newBasket
					}
					message = beConfig.serverMessages.basket.deleted;
					await this.service.update(newPayload);
				} else {
					if (userBasket?.basket?.includes(productId)) {
						const responseBody = {
							value: await this.service.readOne(userId) || [],
							statusMessage: `Product with id:${productId} is already in user basket`,
						};
						response.status(200).send(responseBody);
						console.log(`Product with id:${productId} was updated in user basket`);
						return;
					}
					userBasket.basket.push(productId);
					const newBasket = userBasket.basket;
					newPayload = {
						...userBasket,
						basket: newBasket
					}

					message = beConfig.serverMessages.basket.added;
					await this.service.update(newPayload);
				}

				const responseBody = {
					value: await this.service.readOne(userId) || null,
					statusMessage: message,
				};
				response.status(200).send(responseBody);
				console.log(`Product with id:${productId} was updated in user basket`);
			} catch (err) {
				console.log(err);
				response.status(500).send('System error. Please try again.');
			}
		};
	}

	public createBasket() {
		return async (request: Request, response: Response): Promise<void> => {
			console.log('Basket was created');
		}
	}

	public deleteUserBasket() {
		return async (request: Request, response: Response): Promise<void> => {
			console.log(`Basket with id:${request.params.id} was deleted`);
		}
	}
}