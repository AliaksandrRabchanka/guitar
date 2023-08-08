import { Entity, Column, ObjectIdColumn } from 'typeorm';
import beConfig from '../../beConfig';
import {ObjectId} from "bson";
import { ObjectID } from 'mongodb';

@Entity(beConfig.mongoCollections.users)
export default class User {
	@ObjectIdColumn()
	_id?: ObjectId;

	@Column()
	login: string;

	@Column()
	email: string;

	@Column()
	isAdmin?: boolean;

	@Column()
	password?: string

	@Column()
	newUser?: boolean;

	constructor(obj?: User) {
		if (obj) {
			Object.assign(this, obj);
			this.normalize();
		}
	}

	normalize(): void {
		if (!this.login) {
			this.login = null;
		}
		if (!this.email) {
			this.email = null;
		}
		if (!this.isAdmin) {
			this.isAdmin = false;
		}
		if (!this.password) {
			this.password = null;
		}
	}
}
