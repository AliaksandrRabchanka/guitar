import { createFeatureSelector, createSelector, MemoizedSelector, } from '@ngrx/store';
import { IAppState } from '..';

import { IBuildVersion, ILink } from '../../models';

import { IMainDataState, mainDataKey } from './main-data.state';

export const MainDataFeatureSelector: MemoizedSelector<IAppState, IMainDataState> = createFeatureSelector<IAppState, IMainDataState>(
  mainDataKey,
);

export const selectBuildVersion = createSelector(
  MainDataFeatureSelector,
  (state: IMainDataState): IBuildVersion => state.buildVersion,
);

export const selectLinks = createSelector(
  MainDataFeatureSelector,
  (state: IMainDataState): ILink[] => state.links,
);
