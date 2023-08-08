import { DeleteResult, ObjectID, UpdateResult } from "typeorm";
import { ObjectId } from 'mongodb';
import Product from '../entity/product';

interface IProductRepository {
	find(query?: object): Promise<Product[]>;
	findOne(query: object): Promise<Product>;
	update(_id: object, payload: object):Promise<UpdateResult | Product>;
	delete(query: object): Promise<DeleteResult>;
	save(payload: object): Promise<Product>;
}

class ProductService {
	repository: IProductRepository;

	constructor(repository: IProductRepository) {
		this.repository = repository;
	}

	public async readAll(typeField: string, typeTitle: string): Promise<Product[]> {
		return this.repository.find({ where: { [typeField]: typeTitle } });
	}
	//
	// public async readAllByIDs(ids: ObjectID[]): Promise<Product[]> {
	// 	return this.repository.find({ _id: { $in: ids } });
	// }

	public async readOne(productId: object): Promise<Product> {
		return await this.repository.findOne({ _id: productId } );
	}

	public async create(payload) {
		return this.repository.save(payload);
	}

	public async update(payload) {
		return this.repository.update(payload._id, payload);
	}

	public async delete(id) {
		return this.repository.delete({ _id: id });
	}
}
export { IProductRepository, ProductService };
