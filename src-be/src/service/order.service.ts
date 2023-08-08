import {ObjectID, Repository, UpdateResult} from 'typeorm';
import Order from '../entity/order';

import {IOrderRepository, IOrderService} from '../interfaces/order'

class OrderService {
	private readonly repository: IOrderRepository;

	constructor(repository) {
		this.repository = repository;
	}

	public async readAll(typeField: string, typeTitle: string): Promise<Order[]> {
		return this.repository.find({ where: { [typeField]: typeTitle } });
	}

	public async readByUserId(userId: string): Promise<Order[]> {
		return this.repository.find({ where: { userId: userId }});
	}

	public async readByOrderId(id: string): Promise<Order> {
		return await this.repository.findOne({ _id: id });
	}

	public async update(payload: Order) {
		return await this.repository.update({ _id: payload._id }, payload);
	}

	public async updateOne(id: object, payload: string): Promise<UpdateResult> {
		return await this.repository.updateOne({_id: id}, {$set: payload});
	}

	public async save(payload) {
		return this.repository.save(payload);
	}

	public async createUserOrder(payload) {
		return await this.repository.save(payload);
	}
}
export { IOrderRepository, OrderService};
