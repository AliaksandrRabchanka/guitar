import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from "@ngx-translate/core";

import { ChatPageComponent } from './chat-page.component';
import { ChatPageRoutingModule } from './chat-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollDirective } from '../../directives';

@NgModule({
  imports: [
    CommonModule,
    ChatPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChatPageComponent,
    ScrollDirective
  ],
  exports: [
    ChatPageComponent,
  ]
})
export class ChatPageModule { }
