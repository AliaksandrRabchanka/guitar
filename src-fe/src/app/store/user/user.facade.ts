import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {IBasket, IOrder, IUpdateUserBasket, IUser, IUserOrderData} from '../../models';

import * as UserActions from './user.actions';
import * as UserSelectors from './user.selectors';
import { IAppState } from '..';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  constructor(
    private store: Store<IAppState>,
  ) {
  }

  userLogin(user: IUser): void {
    this.store.dispatch(UserActions.userLogin({ user }));
  }

  get userLogin$(): Observable<IUser> {
    return this.store.pipe(select(UserSelectors.selectLoginUser));
  }

  userLogout(): void {
    this.store.dispatch(UserActions.userLogout());
  }
  get userLogout$(): Observable<IUser> {
    return this.store.pipe(select(UserSelectors.selectLogoutUser));
  }

  getUserBasket(userId: string): void {
    this.store.dispatch(UserActions.getUserBasket({userId}));
  }

  get userBasket$(): Observable<IBasket> {
    return this.store.pipe(select(UserSelectors.selectUserBasket));
  }

  updateUserBasket(updateUserBasketData: IUpdateUserBasket): void {
    this.store.dispatch(UserActions.updateUserBasket({ updateUserBasketData }));
  }

  get updateUserBasket$(): Observable<IBasket> {
    return this.store.pipe(select(UserSelectors.selectUpdateUserBasket));
  }

  resetUserBasket(): void {
    this.store.dispatch(UserActions.resetUserBasket());
  }

  get resetUserBasket$(): Observable<IBasket> {
    return this.store.pipe(select(UserSelectors.selectResetUserBasket));
  }

  getUserOrder(userId): void {
    this.store.dispatch(UserActions.getUserOrder({userId}));
  }

  get userOrder$(): Observable<IUserOrderData[]> {
    return this.store.pipe(select(UserSelectors.selectUserOrder));
  }

  updateUserOrder(orderId: string, updateUserOrderData: any): void {
    this.store.dispatch(UserActions.updateUserOrder({ orderId, updateUserOrderData }));
  }

  get updateUserOrder$(): Observable<IUserOrderData[]> {
    return this.store.pipe(select(UserSelectors.selectUpdateUserOrder));
  }

  createUserOrder(): void {
    this.store.dispatch(UserActions.createUserOrder());
  }

  get createUserOrder$(): Observable<string[]> {
    return this.store.pipe(select(UserSelectors.selectCreateUserOrder));
  }

  updateCreateUserOrder(productId: string): void {
    this.store.dispatch(UserActions.updateCreateUserOrder({ productId }));
  }

  get updateCreateUserOrder$(): Observable<string[]> {
    return this.store.pipe(select(UserSelectors.selectUpdateCreateUserOrder));
  }

  resetUserOrder(): void {
    this.store.dispatch(UserActions.resetUserOrder());
  }

  get resetUserOrder$(): Observable<string[]> {
    return this.store.pipe(select(UserSelectors.selectResetUserOrder));
  }

  submitUserOrder(userOrderData): void {
    this.store.dispatch(UserActions.submitUserOrder({userOrderData}));
  }

  get submitUserOrder$(): Observable<string[]> {
    return this.store.pipe(select(UserSelectors.selectSubmitUserOrder));
  }
}
