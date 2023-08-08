import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PathConfig } from '../../../configs/routes';
import { RestApiService } from "./rest-api-service";
import { IChat } from "../../models";

@Injectable({
  providedIn: 'root',
})

export class ChatService {
  constructor(
    private restApi: RestApiService,
  ) { }

  private getApiBaseUri(): string {
    const {
      bePort,
      baseUrl,
      apiEndpoint,
      chat,
    } = PathConfig;
    console.log(`http://localhost${bePort}${baseUrl}${apiEndpoint}${chat}`)
    return `http://localhost${bePort}${baseUrl}${apiEndpoint}${chat}`;
  }

  public getChat(): Observable<IChat[]> {
    return this.restApi.get<IChat[]>(this.getApiBaseUri());
  }
}
