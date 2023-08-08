import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { BasketModule } from "../../components/basket/basket.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AdminPageComponent
  ],
	imports: [
		CommonModule,
		AdminPageRoutingModule,
		BasketModule,
		TranslateModule
	]
})
export class AdminPageModule { }
