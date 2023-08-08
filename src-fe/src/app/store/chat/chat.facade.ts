import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ChatSelectors from './chat.selectors';
import * as ChatActions from './chat.actions';
import { IAppState } from '..';
import { IChat, IChatError } from '../../models';
import { selectChatError } from './chat.selectors';

@Injectable({
  providedIn: 'root',
})
export class ChatFacadeService {
  constructor(
    private store: Store<IAppState>,
  ) {
  }

  getChat(): void {
    this.store.dispatch(ChatActions.getChat());
  }

  get chat$(): Observable<IChat[]> {
    return this.store.pipe(select(ChatSelectors.selectChat));
  }
  get chatError$(): Observable<IChatError> {
    return this.store.pipe(select(ChatSelectors.selectChatError));
  }

  getHistoryChat(chatHistory): void {
    this.store.dispatch(ChatActions.getHistoryChatSuccess({chat: chatHistory}));
  }
}
