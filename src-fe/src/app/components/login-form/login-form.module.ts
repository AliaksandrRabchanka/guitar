import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule
	],
  declarations: [
    LoginFormComponent
  ],
  exports: [
    LoginFormComponent
  ]
})
export class LoginFormModule { }
