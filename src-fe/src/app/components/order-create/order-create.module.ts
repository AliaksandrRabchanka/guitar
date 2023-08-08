import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from "@ngx-translate/core";

import { OrderCreateComponent } from './order-create.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    OrderCreateComponent
  ],
  declarations: [
    OrderCreateComponent
  ]
})
export class OrderCreateModule { }
