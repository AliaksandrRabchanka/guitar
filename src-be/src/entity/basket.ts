import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import beConfig from '../../beConfig';

@Entity(beConfig.mongoCollections.baskets)
export default class Basket {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column()
	userId: string;

	@Column()
	basket: string[];

	constructor(obj?: Basket) {
		if (obj) {
			Object.assign(this, obj);
		}
	}

	normalize(): void {
		if (!this.userId) {
			this.userId = null;
		}
		if (!this.basket) {
			this.basket = null;
		}
	}
}
