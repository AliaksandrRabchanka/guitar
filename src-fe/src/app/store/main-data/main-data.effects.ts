import { Injectable } from '@angular/core';
import { convertToParamMap, Router, UrlTree } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import {
  switchMap,
  map,
  withLatestFrom,
  exhaustMap,
  debounceTime,
  filter,
  tap,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators';

import { IBuildVersion, ILink, IUser } from '../../models';
import { BuildVersionService } from '../../services';

import * as MainDataActions from './main-data.actions';
import * as MainDataFacadeService from './main-data.facade';
import { IAppState } from '..';

@Injectable()
export class MainDataEffects {
  getBuildVersion$ = createEffect(() => this.actions$.pipe(
    ofType(MainDataActions.getBuildVersion),
    exhaustMap(
      () => this.buildVersion.getBuildVersion().pipe(
        map((version: IBuildVersion) => MainDataActions.getBuildVersionSuccess({ version })),
      ),
    ),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private buildVersion: BuildVersionService,
    ){}
}
