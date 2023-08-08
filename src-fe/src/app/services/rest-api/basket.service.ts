import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { PathConfig } from '../../../configs/routes';
import {IBasket, IUpdatedUserBasketFromBE, IUpdateUserBasket} from '../../models';
import { RestApiService } from './rest-api-service';

@Injectable({
  providedIn: 'root',
})

export class BasketService {
  constructor(
    private http: HttpClient,
    private restApi: RestApiService,
  ) { }

  private getApiBaseUri(userId?: string): string {
    const {
      bePort,
      baseUrl,
      apiEndpoint,
      basket,
    } = PathConfig;
    console.log(userId ?
      `http://localhost${bePort}${baseUrl}${apiEndpoint}${basket}/${userId}`
      : `http://localhost${bePort}${baseUrl}${apiEndpoint}${basket}`)
    return userId ?
      `http://localhost${bePort}${baseUrl}${apiEndpoint}${basket}/${userId}`
      : `http://localhost${bePort}${baseUrl}${apiEndpoint}${basket}`;
  }

  public getUserBasket(userId): Observable<IBasket> {
    return this.restApi.get<IBasket>(this.getApiBaseUri(userId));
  }

  public updateUserBasket(updatedUserBasketData: IUpdateUserBasket): Observable<HttpResponse<IUpdatedUserBasketFromBE>> {
    return this.http.post<IUpdatedUserBasketFromBE>(this.getApiBaseUri(), updatedUserBasketData,{observe: 'response'})
  }
}
