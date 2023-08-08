import { Request, Response } from 'express';
import { DeleteResult } from "typeorm";
import { ObjectId } from "bson";
import Product from '../entity/product';

interface IProductService {
  findAll(): Promise<Product[]>;
  readAll(typeField: string, typeTitle: string): Promise<Product[]>;
  // readAllByIds(ids: ObjectID[]): Promise<Product[]>;
  readOne(id: object): Promise<Product>;
  create(payload: Product): Promise<Product>;
  update(payload: Product): Promise<Product>;
  delete(id: object): Promise<DeleteResult | void>;
}
interface IDeletedProduct {
  deletedID: string;
}

interface IResponseBodyProduct {
  value: Product | Product[] | IDeletedProduct;
  statusMessage: string;
}

class ProductsController {
  private readonly service: IProductService;
  private readonly productFieldName: string;
  private readonly productFieldValue: string;

  public constructor({ service, productFieldName, productFieldValue }) {
    this.service = service;
    this.productFieldName = productFieldName;
    this.productFieldValue = productFieldValue;
  }


  public getProducts() {
    return async (request: Request, response: Response): Promise<void> => {
      try {
        let products;
          products = await this.service.readAll(
            request.query[this.productFieldName] as string,
            request.query[this.productFieldValue] as string,
          );
        if (products) {
          products.map((product) => product.normalize());
        }
        response.status(200).send(products || []);
      } catch (err) {
        console.log(err);
        response.status(500).send('System error. Please try again.');
      }
    };
  }

  public getProduct() {
    return async (request: Request, response: Response): Promise<void> => {
      try {
        let product;

        product = await this.service.readOne(new ObjectId(request.params.id));
        if (product) {
          product.normalize();
        }
        response.status(200).send(product || null);
        console.log(`Product with id:${request.params.id} was got`);
      } catch (err) {
        console.log(err);
        response.status(500).send('System error. Please try again.');
      }
    };
  }
  public updateProduct() {
    return async (request: Request, response: Response): Promise<void> => {
      try {
        if (!request.body) {
          response.status(400).send('Error! Please, try again!');
          return;
        }

        const {_id} = request.body;
        const newProduct = new Product(request.body);

        if (!_id) {
          await this.service.create(newProduct);
        } else {
          const product = await this.service.readOne(new ObjectId(_id));
          newProduct._id = product._id;

          await this.service.update(newProduct);
        }
        const updatedProduct = await this.service.readOne(newProduct._id);
        const responseBody: IResponseBodyProduct = {
          value: {
            _id: updatedProduct._id,
            title: updatedProduct.title,
            image: updatedProduct.image,
            description: updatedProduct.description,
            price: updatedProduct.price,
            normalize() {}
          },
          statusMessage: 'Product has been created/updated',
        };
        response.status(200).send(responseBody);
      } catch (err) {
        console.log(err);
        response.status(500).send('System error. Please try again.');
      }
    }
  }
  public deleteProduct() {
    return async (request: Request, response: Response): Promise<void> => {
      try {
        const res = await this.service.delete(new ObjectId(request.params.id));
        const responseBody: IResponseBodyProduct = {
          value: {
            deletedID: request.params.id
          },
          statusMessage: 'Product has been deleted',
        };
        response.status(200).send(responseBody);
      } catch (err) {
        console.log(err);
        response.status(500).send('System error. Please try again.');
      }
    }
  }
}

export { IProductService, ProductsController };