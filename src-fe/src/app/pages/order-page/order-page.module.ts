import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { OrderPageRoutingModule } from './order-page-routing.module';
import { OrderPageComponent } from './order-page.component';
import { BasketModule } from '../../components/basket/basket.module';

@NgModule({
  declarations: [
    OrderPageComponent
  ],
	imports: [
		CommonModule,
    OrderPageRoutingModule,
    BasketModule,
		TranslateModule
	]
})
export class OrderPageModule { }
