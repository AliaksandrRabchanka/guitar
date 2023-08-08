import { Injectable } from '@angular/core';
import { convertToParamMap, Router, UrlTree } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import {
  concatMap,
  switchMap,
  mergeMap,
  map,
  catchError, exhaustMap,
} from 'rxjs/operators';

import { ChatService } from '../../services';

import * as ChatActions from './chat.actions';
import * as ChatFacadeService from './chat.facade';
import { IAppState } from '..';
import { IChat } from '../../models';
import { WebsocketService } from '../../websocket';
import { WS } from '../../websocket/websocket.events';

@Injectable()
export class ChatEffects {
  getChat$ = createEffect(() => this.actions$.pipe(
    ofType(ChatActions.getChat),
    switchMap(
      () => this.wsService.on().pipe(
        map((chat: IChat[]) => {
          console.log('from effect----', chat);
          return ChatActions.getChatSuccess(
            { chat }
          );
        }),
        catchError((error: HttpErrorResponse) => of(ChatActions.getChatFailed(
          {error}
        ))),
      )
    ),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private wsService: WebsocketService
  ){}
}
