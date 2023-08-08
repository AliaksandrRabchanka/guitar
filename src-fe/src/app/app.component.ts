import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationEnd,
} from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { TranslateService } from "@ngx-translate/core";

import { MainDataFacadeService } from './store/main-data';
import { ChatFacadeService } from "./store/chat";
import { LangConfig } from "../configs/langConfig";


@Component({
  selector: 'guitar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Guitar';

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private mainDataFacade: MainDataFacadeService,
    private chatFacade: ChatFacadeService,
  ) { }

  ngOnInit(): void {
    const lang = LangConfig.language;
    this.translateService.addLangs(lang.languageList);
    this.translateService.setDefaultLang(lang.default);
    this.translateService.use(lang.use);
    this.mainDataFacade.getBuildVersion();
    // this.chatFacade.getChat();
    // this.router.events.pipe(
    //   filter((event: Event) => event instanceof NavigationEnd),
    // ).subscribe(() => {
    //   const { url } = this.router;
    //   console.log('---url----', url);
    // });
  }
}
