import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FocusDirective } from '../../directives';
import { CardCreateComponent } from './card-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    CardCreateComponent
  ],
  declarations: [
    CardCreateComponent,
    FocusDirective
  ]
})
export class CardCreateModule { }
