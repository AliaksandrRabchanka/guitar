import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { environment } from '../environments/environment';
import { reducers } from './store';
import { MainDataEffects } from './store/main-data';
import { ShowcaseEffects } from './store/showcase';
import { UserEffects } from './store/user';
import { AdminEffects } from './store/admin';
import { ChatEffects } from './store/chat';

import { AuthorizedHttpInterceptor } from './services';
import { AdminGuard, LoginGuard } from './guards';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WebsocketModule } from './websocket';

import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { ModalModule } from './components/modal/modal.module';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    WebsocketModule.config({
      url: environment.ws
    }),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    EffectsModule.forRoot([
      MainDataEffects,
      ShowcaseEffects,
      UserEffects,
      AdminEffects,
      ChatEffects
    ]),
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: environment.production,
        serialize: true,
      },
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HeaderModule,
    FooterModule,
    ModalModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    LoginGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizedHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
