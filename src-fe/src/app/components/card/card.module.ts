import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ],
	imports: [
		CommonModule,
		TranslateModule
	]
})
export class CardModule { }
