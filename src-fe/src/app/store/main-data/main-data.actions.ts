import { createAction, props, Action } from '@ngrx/store';

import { IBuildVersion, ILink } from '../../models';

export const getBuildVersion = createAction(
  '[Build version Info] Get build version info',
);

export const getBuildVersionSuccess = createAction(
  '[Build version Info] Successfully get build version info',
  props<{ version: IBuildVersion }>(),
);
