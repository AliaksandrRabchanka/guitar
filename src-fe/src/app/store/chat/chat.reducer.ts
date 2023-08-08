import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import { IChatState, chatInitialState } from './chat.state';
import * as ChatActions from './chat.actions';
import { IChat, IChatError } from '../../models';
import {getHistoryChatFailed, getHistoryChatSuccess} from './chat.actions';

const reducer: ActionReducer<IChatState> = createReducer(
  chatInitialState,
  on(
    ChatActions.getChatSuccess,
    ChatActions.getHistoryChatSuccess,
    (state: IChatState, { chat }: { chat: IChat[] }): IChatState => ({
      ...state,
      messages: [...state.messages, ...chat],
    }),
  ),

  on(
    ChatActions.getChatFailed,
    ChatActions.getHistoryChatFailed,
    (state: IChatState, { error }: { error: IChatError }): IChatState => {
      console.log('getChatFailed/getHistoryChatFailed');
      return {
        ...state,
        error
      };
    }
  ),
)

export function chatStateReducer(state: IChatState, action: Action): IChatState {
  return reducer(state, action);
}
