import * as express from 'express';
import { getManager } from 'typeorm';

import { ProductsController } from '../../controller';
import { ProductService } from '../../service';
import Product from '../../entity/product';

import beConfig from '../../../beConfig';

const repository = getManager(beConfig.connectionsName.toMongo).getRepository(Product);
const service = new ProductService(repository);

const { fieldName, fieldValue } = beConfig.findingFields;

const controller = new ProductsController({
	service,
	productFieldName: fieldName,
	productFieldValue: fieldValue,
});

export default express
	.Router()
	.get('', controller.getProducts())
	.get('/:id', controller.getProduct())
	.post('', controller.updateProduct())
	.delete('/:id', controller.deleteProduct());