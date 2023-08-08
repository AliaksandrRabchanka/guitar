import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedHttpInterceptor implements HttpInterceptor {
  constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const interceptedReq = req.clone({
      // params: req.params.set('secretTokenName', 'secretToken'),
    })
    return next.handle(interceptedReq);
  }
}
