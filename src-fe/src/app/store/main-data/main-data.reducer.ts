import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import { IBuildVersion, ILink } from '../../models';

import { IMainDataState, mainDataInitialState } from './main-data.state';
import * as MainDataActions from './main-data.actions';

const reducer: ActionReducer<IMainDataState> = createReducer(
  mainDataInitialState,
  on(
    MainDataActions.getBuildVersionSuccess,
    (state, { version }): IMainDataState => ({
      ...state,
      buildVersion: version,
    }),
  ),
)

export function mainDataStateReducer(state: IMainDataState, action: Action): IMainDataState {
  return reducer(state, action);
}
