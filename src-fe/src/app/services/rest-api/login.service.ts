import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { PathConfig } from '../../../configs/routes';
import {IUser, IUserFromBE} from '../../models';
import {RestApiService} from "./rest-api-service";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private restApi: RestApiService,
    private http: HttpClient,
  ) { }

    private getApiBaseUri(): string {
    const {
      bePort,
      baseUrl,
      apiEndpoint,
      login,
    } = PathConfig;
    console.log(`http://localhost${bePort}${baseUrl}${apiEndpoint}${login}`)
    return `http://localhost${bePort}${baseUrl}${apiEndpoint}${login}`;
  }
// TODO: Need to use rest-api service instead http client
  public userLogin(loginData: IUser): Observable<HttpResponse<IUserFromBE>> {
    return this.http.post<IUserFromBE>(this.getApiBaseUri(), loginData,{observe: 'response'});
  }
}
