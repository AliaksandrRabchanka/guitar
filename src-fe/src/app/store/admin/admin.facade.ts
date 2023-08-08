import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {IBasket, IOrder, IUser, IUserOrderData} from '../../models';

import * as AdminSelectors from './admin.selectors';
import * as AdminActions from './admin.actions';
import { IAppState } from '..';
import * as UserActions from "../user/user.actions";
import * as UserSelectors from "../user/user.selectors";

@Injectable({
  providedIn: 'root',
})
export class AdminFacadeService {
  constructor(
    private store: Store<IAppState>,
  ) {
  }

  getUsers(): void {
    this.store.dispatch(AdminActions.getUsers());
  }

  get users$(): Observable<IUser[]> {
    return this.store.pipe(select(AdminSelectors.selectUsers));
  }

  resetUsers(): void {
    this.store.dispatch(AdminActions.resetUsers());
  }

  get resetUsers$(): Observable<IUser[]> {
    return this.store.pipe(select(AdminSelectors.selectResetUsers));
  }

  getBaskets(): void {
    this.store.dispatch(AdminActions.getBaskets());
  }

  get baskets$(): Observable<IBasket[]> {
    return this.store.pipe(select(AdminSelectors.selectBaskets));
  }

  resetBaskets(): void {
    this.store.dispatch(AdminActions.resetBaskets());
  }

  get resetBaskets$(): Observable<IBasket[]> {
    return this.store.pipe(select(AdminSelectors.selectResetBaskets));
  }

  getOrders(): void {
    this.store.dispatch(AdminActions.getOrders());
  }

  get orders$(): Observable<Map<string, IOrder[]>> {
    return this.store.pipe(select(AdminSelectors.selectOrders));
  }

  resetOrders(): void {
    this.store.dispatch(AdminActions.resetOrders());
  }

  get resetOrders$(): Observable<Map<string, IOrder[]>> {
    return this.store.pipe(select(AdminSelectors.selectResetOrders));
  }

  updateOrders(orderId: string, updateOrdersData: any): void {
    this.store.dispatch(AdminActions.updateOrders({ orderId, updateOrdersData }));
  }

  get updateOrders$(): Observable<Map<string, IOrder[]>> {
    return this.store.pipe(select(AdminSelectors.selectUpdateOrders));
  }
}
