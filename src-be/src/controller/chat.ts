import { Request, Response } from 'express';

export class ChatController {

	constructor() {
	}

	public sendResponse() {
		return (request: Request, response: Response): void => {
			response.send({
				response: 'BE works',
			});
		};
	}
}