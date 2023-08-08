import { createFeatureSelector, createSelector, MemoizedSelector, } from '@ngrx/store';
import { IAppState } from '..';

import { IChatState, chatKey } from './chat.state';
import { IChat, IChatError } from '../../models';

export const ChatFeatureSelector: MemoizedSelector<IAppState, IChatState> = createFeatureSelector<IChatState>(
  chatKey,
);

export const selectChat: MemoizedSelector<IAppState, IChat[]> = createSelector(
  ChatFeatureSelector,
  (state: IChatState): IChat[] => state.messages,
);

export const selectChatError: MemoizedSelector<IAppState, IChatError> = createSelector(
  ChatFeatureSelector,
  (state: IChatState): IChatError => state.error,
);
