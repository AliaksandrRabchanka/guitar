import { createFeatureSelector, createSelector, MemoizedSelector, } from '@ngrx/store';
import { IAppState } from '..';

import { IProduct } from '../../models';

import { IShowcaseState, showcaseKey } from './showcase.state';

export const ShowcaseFeatureSelector: MemoizedSelector<IAppState, IShowcaseState> = createFeatureSelector<IAppState, IShowcaseState>(
  showcaseKey,
);

export const selectProducts: MemoizedSelector<IAppState, IProduct[]> = createSelector(
  ShowcaseFeatureSelector,
  (state: IShowcaseState): IProduct[] => state.products,
);

export const selectUpdateProduct: MemoizedSelector<IAppState, IProduct[]> = createSelector(
  ShowcaseFeatureSelector,
  (state: IShowcaseState): IProduct[] => state.products,
);
