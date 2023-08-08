import { Request, Response } from 'express';
import {ObjectId} from "bson";
import { ObjectID } from 'mongodb';
import User from '../entity/user';
import {BasketService, IBasketRepository} from '../service/basket.service';

interface IUserService {
  findAll(): Promise<User[]>;
  readAll(typeField: string, typeTitle: string): Promise<User[]>;
  // readAllByIds(ids: ObjectID[]): Promise<User[]>;
  readOne(id: string): Promise<User>;
	createNewUser(payload: User): Promise<User>;
	readOneByLoginPassword(loginName: string, loginPassword: string): Promise<User>;
  // update(id: string, payload: User): Promise<UpdateResult | User>;
  // delete(id: string): Promise<DeleteResult | void>;
}
interface IDeletedUser {
  deletedID: string;
}

interface IResponseBodyUser {
  value: User | User[] | IDeletedUser;
  statusMessage: string;
}

class UserController {
  private readonly service: IUserService;
  private readonly userFieldName: string;
	private readonly userFieldValue: string;
	private readonly basketService: BasketService;

  public constructor({ service, userFieldName, userFieldValue, basketService}) {
    this.service = service;
    this.userFieldName = userFieldName;
		this.userFieldValue = userFieldValue;
		this.basketService = basketService;
	}

	public checkUser() {
		return async (request: Request, response: Response): Promise<void> => {
			try {
				let user;
				if (!request.body) {
					response.status(400).send('Error! Please, try again!');
					return;
				}

				const { login, password, newUser } = request.body

				user = await this.service.readOneByLoginPassword(login, password);

				if (!user) {
					if (!newUser){
							response.status(400).send('Error! Login or password is incorrect.');
						return;
					}

					const newUserData = new User(request.body);

					user = await this.service.createNewUser(newUserData);

					const basket = {
						userId: user._id.toHexString(),
						basket: []
					}
					await this.basketService.create(basket);
				}

				const responseBody: IResponseBodyUser = {
					value: {
						_id: user._id.valueOf(),
						login: user.login,
						email: user.email,
						isAdmin: user.isAdmin,
						normalize() {}
					},
					statusMessage: 'User has been logged',
				};
				response.status(200).send(responseBody);
			} catch (err) {
				console.log(err);
				response.status(500).send('System error. Please try again.');
			}
		}
	}
	public getUser()
		{
		return async (request: Request, response: Response): Promise<void> => {
			try {
				let user;

				user = await this.service.readOne(request.params.id);
				if (user) {
					user.normalize();
				}
				response.status(200).send(user || null);
				console.log(`User with id:${request.params.id} was got`);
			} catch (err) {
				console.log(err);
				response.status(500).send('System error. Please try again.');
			}
		};
	}
  public getUsers() {
    return async (request: Request, response: Response): Promise<void> => {
      try {
        let users;
          users = await this.service.readAll(
            request.query[this.userFieldName] as string,
            request.query[this.userFieldValue] as string,
          );
        if (users) {
          users.map((user) => user.normalize());
        }
        response.status(200).send(users || []);
      } catch (err) {
        console.log(err);
        response.status(500).send('System error. Please try again.');
      }
    };
  }
  public createUser() {
    return async (request: Request, response: Response): Promise<void> => {
      console.log('User was created');
    }
  }
  public updateUser() {
    return async (request: Request, response: Response): Promise<void> => {
      console.log(`User with id:${request.params.id} was updated`);
    }
  }
  public deleteUser() {
    return async (request: Request, response: Response): Promise<void> => {
      console.log(`User with id:${request.params.id} was deleted`);
    }
  }
}

export { IUserService, UserController };