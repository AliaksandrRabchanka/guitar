import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { LoginFormModule } from '../../components/login-form/login-form.module';
import { RegisterFormModule } from '../../components/register-form/register-form.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	imports: [
		CommonModule,
		LoginPageRoutingModule,
		LoginFormModule,
		RegisterFormModule,
		TranslateModule
	],
  declarations: [
    LoginPageComponent,
  ],
  exports: [
    LoginPageComponent,
  ]
})
export class LoginPageModule { }
