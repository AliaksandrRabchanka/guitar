import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TranslateModule} from "@ngx-translate/core";

import { ModalComponent } from './modal.component';
import { OrderCreateModule } from '../order-create/order-create.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    OrderCreateModule
  ],
  exports: [
    ModalComponent
  ],
  declarations: [
    ModalComponent
  ]
})
export class ModalModule { }
