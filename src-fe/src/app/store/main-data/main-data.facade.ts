import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IBuildVersion, ILink } from '../../models';

import * as MainDataSelectors from './main-data.selectors';
import * as MainDataActions from './main-data.actions';
import { IAppState } from '..';

@Injectable({
  providedIn: 'root',
})
export class MainDataFacadeService {
  constructor(
    private store: Store<IAppState>,
  ) {
  }

  getBuildVersion(): void {
    this.store.dispatch(MainDataActions.getBuildVersion());
  }

  get buildVersion$(): Observable<IBuildVersion> {
    return this.store.pipe(select(MainDataSelectors.selectBuildVersion));
  }

}
