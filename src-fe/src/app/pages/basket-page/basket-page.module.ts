import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TranslateModule} from "@ngx-translate/core";

import { BasketPageRoutingModule } from './basket-page-routing.module';
import { BasketPageComponent } from './basket-page.component';
import { BasketModule } from "../../components/basket/basket.module";

import { ModalModule } from "../../components/modal/modal.module";
import { OrderCreateModule } from "../../components/order-create/order-create.module";

@NgModule({
  declarations: [
    BasketPageComponent
  ],
  imports: [
    CommonModule,
    BasketPageRoutingModule,
    BasketModule,
    TranslateModule,
    ModalModule,
    OrderCreateModule
  ]
})
export class BasketPageModule { }
