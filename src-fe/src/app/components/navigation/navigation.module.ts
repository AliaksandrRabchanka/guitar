import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';

import { NavigationComponent } from './navigation.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
	imports: [
		CommonModule,
		AppRoutingModule,
		TranslateModule
	],
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
