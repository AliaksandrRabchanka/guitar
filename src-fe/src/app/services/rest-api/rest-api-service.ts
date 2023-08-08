import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { httpErrorMessages } from '../../../configs/error-messages';

import {IUser} from '../../models';

@Injectable({
	providedIn: 'root'
})
export class RestApiService {
	constructor(private http: HttpClient) {
	}

  get<RespType>(uri: string, params?: {}) {
    return this.http.get<RespType>(uri, { params: params || {} }).pipe(
      catchError(() => throwError(new Error(httpErrorMessages.serverNotResponding))),
    );
  }

  post<RespType>(uri: string, reqBody: any, params?: {}) {
    return this.http.post<RespType>(uri, reqBody, { params: params || {} }).pipe(
      catchError(() => throwError(new Error(httpErrorMessages.serverNotResponding))),
    );
  }

  postAdmin<RespType>(uri: string, reqBody: any, params?: {}) {
    return this.http.post<RespType>(uri, reqBody, {observe: 'response'}).pipe(
      catchError((message: HttpErrorResponse) => throwError(new Error(message.error.statusMessage))),
    );
  }

  delete<RespType>(uri: string, params?: {}) {
    return this.http.delete<RespType>(uri, {observe: 'response'}).pipe(
      catchError((message: HttpErrorResponse) => throwError(new Error(message.error.statusMessage))),
    ) as Observable<HttpResponse<RespType>>;
  }

  put<RespType>(uri: string, reqBody: any, params?: {}) {
    return this.http.put<RespType>(uri, reqBody, {observe: 'response'}).pipe(
      catchError((message: HttpErrorResponse) => throwError(new Error(message.error.statusMessage))),
    );
  }

  patch<RespType>(uri: string, reqBody: any, params?: {}) {
    return this.http.patch<RespType>(uri, reqBody, {observe: 'response'}).pipe(
      catchError((message: HttpErrorResponse) => throwError(new Error(message.error.statusMessage))),
    );
  }
}
