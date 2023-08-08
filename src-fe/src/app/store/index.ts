import { ActionReducerMap } from '@ngrx/store';

import { mainDataKey, IMainDataState, mainDataStateReducer } from './main-data';
import { showcaseKey, IShowcaseState, showcaseStateReducer } from './showcase';
import { userKey, IUserState, userStateReducer } from './user';
import { adminKey, IAdminState, adminStateReducer } from './admin';
import { chatKey, IChatState, chatStateReducer } from './chat';

export interface IAppState {
  [mainDataKey]: IMainDataState;
  [showcaseKey]: IShowcaseState;
  [userKey]: IUserState;
  [adminKey]: IAdminState;
  [chatKey]: IChatState;
}

export const reducers: ActionReducerMap<IAppState> = {
  [mainDataKey]: mainDataStateReducer,
  [showcaseKey]: showcaseStateReducer,
  [userKey]: userStateReducer,
  [adminKey]: adminStateReducer,
  [chatKey]: chatStateReducer,
}
