import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {IBuildVersion} from '../../models/';
import {MainDataFacadeService} from '../../store/main-data';

@Component({
  selector: 'guitar-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  public buildVersionInfo$: Observable<string> = this.mainDataFacade.buildVersion$.pipe(
    map((buildVersionInfo: IBuildVersion): string => this.getBuildVersionInfo(buildVersionInfo)),
  );
  constructor(private mainDataFacade: MainDataFacadeService) { }

  ngOnInit(): void {}

  getBuildVersionInfo(buildVersionInfo: IBuildVersion): string {
    return buildVersionInfo?.beBuild || '';
  }
}
