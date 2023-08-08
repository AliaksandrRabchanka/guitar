import { ObjectID } from 'mongodb';
import User from '../entity/user';

interface IUserRepository {
	find(query?: object): Promise<User[]>;
	findOne(query: object): Promise<User>;
	save(query: object): Promise<User>;
}

class UserService {
	repository: IUserRepository;

	constructor(repository: IUserRepository) {
		this.repository = repository;
	}

	public async readAll(typeField: string, typeTitle: string): Promise<User[]> {
		return this.repository.find({ where: { [typeField]: typeTitle } });
	}

	public async readOneByLoginPassword(loginName: string, loginPassword: string): Promise<User> {
		return this.repository.findOne({ login: loginName, password: loginPassword });
	}

	public async createNewUser(payload) {
		return this.repository.save(payload);
	}
}
export { IUserRepository, UserService };
