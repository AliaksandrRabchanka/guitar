import {ObjectID, UpdateResult} from "typeorm";
import Basket from '../entity/basket';

interface IBasketRepository {
	find(query?: object): Promise<Basket[]>;
	findOne(query: object): Promise<Basket>;
	save(query: object): Promise<Basket>;
	update(query: object, payload: object): Promise<UpdateResult | Basket>;
}

class BasketService {
	repository: IBasketRepository;

	constructor(repository: IBasketRepository) {
		this.repository = repository;
	}

	public async readAll(typeField: string, typeTitle: string): Promise<Basket[]> {
		return this.repository.find({ where: { [typeField]: typeTitle } });
	}

	public async readOne(userId: string): Promise<Basket> {
		return this.repository.findOne({ userId: userId });
	}

	public async update(payload: Basket) {
		return await this.repository.update({ _id: payload._id }, payload);
	}

	public async save(payload) {
		return this.repository.save(payload);
	}

	public async create(payload) {
		return await this.repository.save(payload);
	}
}
export { IBasketRepository, BasketService };
