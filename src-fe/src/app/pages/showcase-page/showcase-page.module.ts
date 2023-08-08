import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ShowcasePageRoutingModule } from './showcase-page-routing.module';
import { ShowcasePageComponent } from './showcase-page.component';
import { CardModule } from '../../components/card/card.module';
import { CardCreateModule } from '../../components/card-create/card-create.module';
import { ProductsFilterPipe } from '../../pipes';

@NgModule({
  declarations: [
    ShowcasePageComponent,
    ProductsFilterPipe
  ],
	imports: [
		CommonModule,
    FormsModule,
    ShowcasePageRoutingModule,
		CardModule,
		TranslateModule,
		CardCreateModule
	]
})
export class ShowcasePageModule { }
