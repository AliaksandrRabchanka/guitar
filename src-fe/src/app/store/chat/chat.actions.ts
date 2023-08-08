import { createAction, props, Action } from '@ngrx/store';
import { IChat, IChatError } from '../../models';

//chat actions
export const getChat = createAction(
  '[Chat WebSocket] Get chat',
);

export const getChatSuccess = createAction(
  '[Chat WebSocket] Successfully get chat',
  props<{
    chat: IChat[];
  }>(),
);

export const getChatFailed = createAction(
  '[Chat WebSocket] Failed to process get chat',
  props<{ error: IChatError }>(),
);

export const getHistoryChatSuccess = createAction(
  '[Chat WebSocket] Successfully get chat history',
  props<{
    chat: IChat[];
  }>(),
);

export const getHistoryChatFailed = createAction(
  '[Chat WebSocket] Failed to process get chat history',
  props<{ error: IChatError }>(),
);
