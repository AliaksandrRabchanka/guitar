import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import beConfig from '../../beConfig';
import {ObjectId} from "bson";

@Entity(beConfig.mongoCollections.orders)
export default class Order {
	@ObjectIdColumn()
	_id: ObjectId;

	@Column()
	userId: string;

	@Column()
	status: string;

	@Column()
	products: string[];

	constructor(obj?: Order) {
		if (obj) {
			Object.assign(this, obj);
			this.normalize();
		}
	}

	normalize(): void {
		if (!this.userId) {
			this.userId = null;
		}
		if (!this.status) {
			this.status = null;
		}
		if (!this.products) {
			this.products = null;
		}
	}
}
