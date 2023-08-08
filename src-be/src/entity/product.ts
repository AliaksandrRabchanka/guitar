import { Entity, Column, ObjectIdColumn } from 'typeorm';
import beConfig from '../../beConfig';
import {ObjectId} from "bson";
import { ObjectID } from 'mongodb';

@Entity(beConfig.mongoCollections.products)
export default class Product {
	@ObjectIdColumn()
	_id: ObjectId;

	@Column()
	title: string;

	@Column()
	image: string;

	@Column()
	price: number;

	@Column()
	description: string;

	constructor(obj?: Product) {
		if (obj) {
			Object.assign(this, obj);
			this.normalize();
		}
	}

	normalize(): void {
		if (!this.title) {
			this.title = null;
		}
		if (!this.image) {
			this.image = null;
		}
		if (!this.price) {
			this.price = null;
		}
		if (!this.description) {
			this.description = null;
		}
	}
}
