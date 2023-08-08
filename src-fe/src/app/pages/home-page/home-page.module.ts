import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { LoginPageModule } from '../login-page/login-page.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	imports: [
		CommonModule,
		HomePageRoutingModule,
		LoginPageModule,
		TranslateModule
	],
  declarations: [
    HomePageComponent
  ],
  exports: [
    HomePageComponent,
  ]
})
export class HomePageModule { }
