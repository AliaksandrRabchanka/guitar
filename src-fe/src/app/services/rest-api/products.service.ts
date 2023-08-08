import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { PathConfig } from '../../../configs/routes';
import {IDeleteProductResponse, IProduct, IProductFromBE} from '../../models';
import { RestApiService } from "./rest-api-service";

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  constructor(
    private restApi: RestApiService,
    private http: HttpClient,
  ) { }

    private getApiBaseUri(): string {
    const {
      bePort,
      baseUrl,
      apiEndpoint,
      products,
    } = PathConfig;
    console.log(`http://localhost${bePort}${baseUrl}${apiEndpoint}${products}`)
    return `http://localhost${bePort}${baseUrl}${apiEndpoint}${products}`;
  }

  public getProducts(): Observable<IProduct[]> {
    return this.restApi.get<IProduct[]>(this.getApiBaseUri());
  }

  public updateProduct(product): Observable<HttpResponse<IProductFromBE>> {
    return this.http.post<IProductFromBE>(this.getApiBaseUri(), product,{observe: 'response'});
  }

  public deleteProduct(product): Observable<HttpResponse<IDeleteProductResponse>> {
    return this.http.delete<IDeleteProductResponse>(`${this.getApiBaseUri()}/${product.productId}`,{observe: 'response'});
  }

  // public deletePACS({ id }): Observable<HttpResponse<DeletePACSesResponse>> {
  //   const url = `${PathConfig.baseUrl}${PathConfig.apiEndpoint}${PathConfig.pacs}/${id}`;
  //
  //   return this.restApi.delete<DeletePACSesResponse>(url, { observe: 'response' });
  // }
}
