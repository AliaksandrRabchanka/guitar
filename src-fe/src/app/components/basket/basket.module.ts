import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketComponent } from './basket.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    BasketComponent
  ],
  exports: [
    BasketComponent
  ],
	imports: [
		CommonModule,
		TranslateModule
	]
})
export class BasketModule { }
