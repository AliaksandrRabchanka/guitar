import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RegisterFormComponent } from './register-form.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule
	],
  declarations: [
    RegisterFormComponent
  ],
  exports: [
    RegisterFormComponent
  ]
})
export class RegisterFormModule { }
