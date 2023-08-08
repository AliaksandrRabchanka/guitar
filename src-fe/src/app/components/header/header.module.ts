import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';

import { HeaderComponent } from './header.component';
import { NavigationModule } from '../navigation/navigation.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
	imports: [
		CommonModule,
		AppRoutingModule,
		NavigationModule,
		TranslateModule
	],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
