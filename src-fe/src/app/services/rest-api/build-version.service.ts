import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PathConfig } from '../../../configs/routes';
import { IBuildVersion } from '../../models';
import {RestApiService} from "./rest-api-service";

@Injectable({
  providedIn: 'root',
})
// export class BuildVersionService {
//   constructor(
//     private http: HttpClient,
//   ) {}
//
//   getBuildVersion(): Observable<BuildVersion> {
//     return this.http.get<BuildVersion>(this.getApiBaseUri());
//   }
//
//   private getApiBaseUri(): string {
//     const {
//       bePort,
//       baseUrl,
//       apiEndpoint,
//       buildVersion,
//     } = PathConfig;
//     console.log(`${bePort}${baseUrl}${apiEndpoint}${buildVersion}`)
//     return `${bePort}${baseUrl}${apiEndpoint}${buildVersion}`;
//   }
// }

export class BuildVersionService {
  constructor(
    private restApi: RestApiService,
  ) { }

    private getApiBaseUri(): string {
    const {
      bePort,
      baseUrl,
      apiEndpoint,
      buildVersion,
    } = PathConfig;
    console.log(`http://localhost${bePort}${baseUrl}${apiEndpoint}${buildVersion}`)
    return `http://localhost${bePort}${baseUrl}${apiEndpoint}${buildVersion}`;
  }

  public getBuildVersion(): Observable<IBuildVersion> {
    return this.restApi.get<IBuildVersion>(this.getApiBaseUri());
  }
}
