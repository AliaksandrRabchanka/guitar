import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { PathConfig } from '../../../configs/routes';
import {IBasket, IOrder, IUpdatedUserOrderFromBE, IUser, IUserFromBE, IUserOrderDataFromBE} from '../../models';
import { RestApiService } from "./rest-api-service";

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private restApi: RestApiService,
    private http: HttpClient,
  ) { }

  private getApiBaseUri(url, orderId?): string {
    const {
      bePort,
      baseUrl,
      apiEndpoint,
    } = PathConfig;
    // console.log(`http://localhost${bePort}${baseUrl}${apiEndpoint}${url}`)
    // return `http://localhost${bePort}${baseUrl}${apiEndpoint}${url}`;

    console.log(orderId ?
      `http://localhost${bePort}${baseUrl}${apiEndpoint}${url}/${orderId}`
      : `http://localhost${bePort}${baseUrl}${apiEndpoint}${url}`)
    return orderId ?
      `http://localhost${bePort}${baseUrl}${apiEndpoint}${url}/${orderId}`
      : `http://localhost${bePort}${baseUrl}${apiEndpoint}${url}`;
  }

  public getUsers(): Observable<IUser[]> {
    return this.restApi.get<IUser[]>(this.getApiBaseUri(PathConfig.login));
  }

  public getBaskets(): Observable<IBasket[]> {
    return this.restApi.get<IBasket[]>(this.getApiBaseUri(PathConfig.basket));
  }

  public getOrders(): Observable<IOrder[]> {
    return this.restApi.get<IOrder[]>(this.getApiBaseUri(PathConfig.order));
  }

  public updateOrders(orderId: string, updatedUserOrderData: any): Observable<HttpResponse<IUpdatedUserOrderFromBE>> {
    return this.restApi.patch<IUpdatedUserOrderFromBE>(this.getApiBaseUri(PathConfig.order,orderId), updatedUserOrderData,{observe: 'response'})
  }
}
