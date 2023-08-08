import { Injectable } from '@angular/core';
import {PathConfig} from "../../../configs/routes";
import {Observable} from "rxjs";
import {IBasket, IOrder, IUpdatedUserBasketFromBE, IUpdateUserBasket, IUserOrderData, IUserOrderDataFromBE} from "../../models";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RestApiService} from "./rest-api-service";

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  constructor(
    private http: HttpClient,
    private restApi: RestApiService,
  ) { }

  private getApiBaseUri(userId?: string): string {
    const {
      bePort,
      baseUrl,
      apiEndpoint,
      order,
    } = PathConfig;
    console.log(userId ?
      `http://localhost${bePort}${baseUrl}${apiEndpoint}${order}/${userId}`
      : `http://localhost${bePort}${baseUrl}${apiEndpoint}${order}`)
    return userId ?
      `http://localhost${bePort}${baseUrl}${apiEndpoint}${order}/${userId}`
      : `http://localhost${bePort}${baseUrl}${apiEndpoint}${order}`;
  }

  public submitUserOrder(userOrderData: IUserOrderData): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.getApiBaseUri(), userOrderData,{observe: 'response'})
  }

  public getUserOrder(userId): Observable<IUserOrderData[]> {
    return this.restApi.get<IUserOrderData[]>(this.getApiBaseUri(userId));
  }

  public updateUserOrder(orderId: string, updatedUserOrderData: any): Observable<HttpResponse<IUserOrderDataFromBE>> {
    return this.restApi.patch<IUserOrderDataFromBE>(this.getApiBaseUri(orderId), updatedUserOrderData,{observe: 'response'})
  }
}
